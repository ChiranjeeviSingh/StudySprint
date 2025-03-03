package handlers

import (
	"backend/internal/database"
	"backend/internal/models"
	"backend/internal/services"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

// HandleFormSubmission processes a form submission
func HandleFormSubmission(c *gin.Context) {
	// Get the job_id parameter
	jobID, err := strconv.Atoi(c.PostForm("job_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid job_id"})
		return
	}

	// Get the user ID for validation
	userIDStr := c.PostForm("user_id")
	log.Println("Extracted UserID:", userIDStr)

	if userIDStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
		return
	}

	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid User ID"})
		return
	}
	
	log.Println(userID)

	// Verify the user exists and is valid
	var count int
	log.Printf("🔍 Checking if user exists: %d", userID)
	db := database.GetDB()
	err = db.QueryRow("SELECT COUNT(*) FROM users WHERE id = $1", userID).Scan(&count)
	log.Printf("🔍 Checking if user exists: %d Exists? %t Error: %v", userID, count > 0, err)

	if err != nil {
		log.Printf("Error validating user: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to validate user"})
		return
	}

	log.Printf("🔍 Verified user count: %d Error: %v", count, err)

	if count < 1 {
		// If user doesn't exist, try to create one if we have the required info
		username := c.PostForm("username")
		email := c.PostForm("email")
		
		if username != "" && email != "" {
			log.Printf("🆕 Creating new user: %d", userID)
			
			// Default password hash (in a real app, you'd generate this properly)
			passwordHash := "$2a$10$defaultdefaultdefaultdefaultdefaultdefault"
			
			// Insert user
			query := `
        INSERT INTO users (id, username, email, password_hash, created_at, updated_at)
        VALUES ($1, $2, $3, $4, NOW(), NOW())`
			
			log.Printf("🛠 Executing INSERT query: %s", query)
			log.Printf("➡️ With values: %d %s %s %s", userID, username, email, passwordHash)
			
			_, err = db.Exec(query, userID, username, email, passwordHash)
			if err != nil {
				log.Printf("Failed to create user: %v", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
				return
			}
			
			log.Printf("User inserted successfully: %d", userID)
			count = 1 // User now exists
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid User"})
			return
		}
	}

	log.Printf("User exists and is verified in `users` table: %d", userID)

	// Check if this user already applied for this job
	err = db.QueryRow("SELECT COUNT(*) FROM job_submissions WHERE user_id = $1 AND job_id = $2", userID, jobID).Scan(&count)
	if err != nil {
		log.Printf("Error checking existing submission: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check submission"})
		return
	}

	if count > 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "You have already applied for this job"})
		return
	}

	// Get form UUID from path
	formUUID := c.Param("form_uuid")
	if formUUID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid form UUID"})
		return
	}

	// Get form data as JSON string
	formDataJSON := c.PostForm("form_data")
	if formDataJSON == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Form data is required"})
		return
	}

	// Log the raw form data received for debugging
	log.Printf("🔍 Raw Form Data Received: %v", c.Request.PostForm)

	// Parse form data to extract skills
	var formData map[string]interface{}
	if err := json.Unmarshal([]byte(formDataJSON), &formData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid form data format"})
		return
	}

	// Extract skills from form data
	var extractedSkills []string
	if skills, ok := formData["skills"].([]interface{}); ok {
		for _, skill := range skills {
			if skillStr, ok := skill.(string); ok {
				extractedSkills = append(extractedSkills, skillStr)
			}
		}
	}

	// Handle file upload
	file, err := c.FormFile("resume")
	
	// Check if we're in test mode (no need for actual upload)
	testMode := c.GetHeader("X-Test-Mode") == "true" || os.Getenv("TEST_MODE") == "true" || os.Getenv("S3_TEST_MODE") == "true"
	var resumeURL string
	
	if err != nil && !testMode {
		log.Println("No resume file provided:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Resume file is required"})
		return
	}

	// Process the resume file (upload to S3, extract text, etc.)
	if !testMode && file != nil {
		// Get username from form
		username := c.PostForm("username")
		if username == "" {
			username = "user" // Default if not provided
		}

		resumeURL, err = services.UploadResumeToS3(file, userID, username)
		if err != nil {
			log.Println("Resume Upload Error:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload resume"})
			return
		}
	} else {
		// In test mode, use a mock URL
		resumeURL = fmt.Sprintf("https://test-bucket.s3.amazonaws.com/resumes/%d_test_user.pdf", userID)
		log.Println("Test mode: Using mock resume URL:", resumeURL)
	}

	// Calculate ATS score based on skills match, resume quality, etc.
	atsScore := calculateATSScore(extractedSkills, resumeURL)

	// Create database entry
	var submissionID int
	err = db.QueryRow(`
		INSERT INTO job_submissions (job_id, user_id, form_uuid, form_data, skills, resume_url, ats_score)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING id
	`, jobID, userID, formUUID, formDataJSON, pq.Array(extractedSkills), resumeURL, atsScore).Scan(&submissionID)

	if err != nil {
		log.Println("Database Insert Error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save submission"})
		return
	}

	// Return success with submission ID and ATS score
	c.JSON(http.StatusOK, gin.H{
		"id":        submissionID,
		"ats_score": atsScore,
		"message":   "Application submitted successfully",
	})
}

// calculateATSScore is a basic scoring algorithm
func calculateATSScore(skills []string, resumeURL string) int {
	// Simple scoring logic based on number of skills
	baseScore := 70
	skillPoints := len(skills) * 5
	
	score := baseScore + skillPoints
	if score > 100 {
		score = 100
	}
	return score
}

// GetFormSubmissions retrieves all submissions for a specific form
func GetFormSubmissions(c *gin.Context) {
	formUUID := c.Param("form_uuid")
	if formUUID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Form UUID is required"})
		return
	}

	// Get optional sorting parameter (default to ats_score)
	sortBy := c.DefaultQuery("sort_by", "ats_score")
	// Validate sort parameter
	validSortFields := map[string]bool{
		"ats_score": true,
		"created_at": true,
	}
	if !validSortFields[sortBy] {
		sortBy = "ats_score" // Default to ats_score if invalid
	}

	// Get optional limit parameter (default to 10)
	limitStr := c.DefaultQuery("limit", "10")
	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit <= 0 {
		limit = 10 // Default to 10 if invalid
	}

	// Get date filter (all, today, or specific date)
	dateFilter := c.DefaultQuery("date", "all")
	
	// Build the query based on parameters
	baseQuery := `
		SELECT id, job_id, user_id, form_uuid, form_data, skills, resume_url, ats_score, created_at
		FROM job_submissions 
		WHERE form_uuid = $1`
	
	var query string
	var queryParams []interface{}
	queryParams = append(queryParams, formUUID)
	
	if dateFilter == "today" {
		query = baseQuery + " AND created_at::date = CURRENT_DATE"
	} else if dateFilter != "all" {
		// Try to parse the date
		_, err := time.Parse("2006-01-02", dateFilter)
		if err == nil {
			query = baseQuery + " AND created_at::date = $2"
			queryParams = append(queryParams, dateFilter)
		} else {
			log.Println("Invalid date format, ignoring date filter:", dateFilter)
			query = baseQuery
		}
	} else {
		query = baseQuery
	}
	
	// Add ordering and limit
	query += fmt.Sprintf(" ORDER BY %s DESC LIMIT $%d", sortBy, len(queryParams)+1)
	queryParams = append(queryParams, limit)
	
	// Log the query for debugging
	log.Println("Executing query:", query, "with params:", queryParams)
	
	// Execute the query
	db := database.GetDB()
	rows, err := db.Query(query, queryParams...)
	if err != nil {
		log.Println("Database query error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve submissions"})
		return
	}
	defer rows.Close()
	
	// Process the results
	var submissions []models.JobSubmission
	for rows.Next() {
		var sub models.JobSubmission
		var skills pq.StringArray
		
		if err := rows.Scan(&sub.ID, &sub.JobID, &sub.UserID, &sub.FormUUID, &sub.FormData, &skills, &sub.ResumeURL, &sub.ATSScore, &sub.CreatedAt); err != nil {
			log.Println("Error scanning row:", err)
			continue
		}
		
		sub.Skills = []string(skills)
		submissions = append(submissions, sub)
	}
	
	if err = rows.Err(); err != nil {
		log.Println("Error iterating rows:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error processing submissions"})
		return
	}
	
	c.JSON(http.StatusOK, submissions)
}
