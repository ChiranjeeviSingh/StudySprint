package api

import (
    "github.com/gin-gonic/gin"
    "backend/internal/api/handlers"
)

func SetupRoutes(router *gin.Engine) {
    api := router.Group("/api")
    
    // Authentication routes
    api.POST("/login", handlers.Login)
    api.POST("/register", handlers.Register)
}