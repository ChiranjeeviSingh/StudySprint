package models

import (
	"mime/multipart"
	"time"

	"github.com/lib/pq"
)

// FormSubmissionRequest represents a job submission request from the frontend

type FormSubmissionRequest struct {
	JobID    string                `form:"job_id" binding:"required"`
	UserID   int                   `form:"user_id" binding:"required"`
	Username string                `form:"username" binding:"required"`
	Email    string                `form:"email" binding:"required,email"`
	Skills   []string              `form:"skills[]"` // Explicitly define skills as an array
	FormData string                `form:"form_data" binding:"required"`
	Resume   *multipart.FileHeader `form:"resume" binding:"required"`
}

type JobSubmission struct {
	ID        int            `json:"id" db:"id"`
	JobID     string         `json:"job_id" db:"job_id"`
	UserID    int            `json:"user_id" db:"user_id"`
	FormUUID  string         `json:"form_uuid" db:"form_uuid"`
	FormData  []byte         `json:"-" db:"form_data"` // Store raw JSON, process later
	Skills    pq.StringArray `json:"skills" db:"skills"`
	ResumeURL string         `json:"resume_url" db:"resume_url"`
	ATSScore  int            `json:"ats_score" db:"ats_score"`
	CreatedAt time.Time      `json:"created_at" db:"created_at"`
}
