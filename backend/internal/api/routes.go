package api

import (
    "github.com/gin-gonic/gin"
    "backend/internal/api/handlers"
    "backend/internal/api/middleware"
)

func SetupRoutes(router *gin.Engine) {
    api := router.Group("/api", middleware.AuthMiddleware())
    
    // Authentication routes
    api.POST("/login", handlers.LoginH)
    api.POST("/register", handlers.RegisterH)

    //job routes
    jobs := api.Group("/jobs")
    {
        jobs.POST("", handlers.CreateJobH)                        // Create job
        jobs.PUT("/:jobId", handlers.UpdateJobH)                  // Update job
        jobs.GET("/:jobId", handlers.GetJobByIdH)                 // Get specific job by id
        jobs.GET("/jobtitle/:jobtitle", handlers.GetJobsByTitleH) // Get jobs by jobtitle - Has to include the jobtitle(could be a subset)
        jobs.GET("/status/:status", handlers.GetJobsByStatusH)    // Get jobs by status
        jobs.GET("", handlers.ListUserJobsH)                      // List all jobs for user
        jobs.DELETE("/:jobId", handlers.DeleteJobH)               // Delete job
    }

    //form template routes
    formTemplates := api.Group("/forms/templates")
    {
        formTemplates.POST("", handlers.CreateFormTemplateH)                     // Create form template
        formTemplates.GET("/:form_template_id", handlers.GetFormTemplateH)       // Get specific template
        formTemplates.GET("", handlers.ListFormTemplatesH)                       // List all templates
        formTemplates.DELETE("/:form_template_id", handlers.DeleteFormTemplateH) // Delete template
    }

    

}