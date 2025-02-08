package main

import (
    "log"
    "github.com/gin-gonic/gin"
    "backend/internal/api"
    "backend/internal/database"
    "backend/internal/config"
)

func main() {

    config.LoadConfig()

    database.Connect()
    
    router := gin.Default()

    api.SetupRoutes(router)
    
    log.Println("Starting server on :8080")
    if err := router.Run(":8080"); err != nil {
        log.Fatalf("Could not start server: %s\n", err)
    }
}