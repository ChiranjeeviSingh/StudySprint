package api

import (
	"backend/internal/api/handlers"

	"github.com/gin-gonic/gin"
)

// SetupRoutes defines all API routes
func SetupRoutes(router *gin.Engine) {
	api := router.Group("/api")

	api.POST("/login", handlers.Login)
	api.POST("/register", handlers.Register)

	api.POST("/forms/:form_uuid/submissions", handlers.HandleFormSubmission) // Submit form response
	api.GET("/forms/:form_uuid/submissions", handlers.GetFormSubmissions)    // Fetch form responses

}
