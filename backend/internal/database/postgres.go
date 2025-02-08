package database

import (
    "fmt"
    "log"
    "github.com/jmoiron/sqlx"
    _ "github.com/lib/pq" //postgres driver
    "backend/internal/config"
)

var db *sqlx.DB

// Connect establishes a connection to the PostgreSQL database.
func Connect() {

    cfg := config.GetConfig().DBConfig
    
    psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
    cfg.Host, cfg.Port, cfg.Username, cfg.Password, cfg.Dbname)

    var err error
    db, err = sqlx.Connect("postgres", psqlInfo)
    if err != nil {
        log.Fatalf("Unable to connect to database: %v", err)
    }

    err = db.Ping()
    if err != nil {
        log.Fatalf("Unable to reach the database: %v", err)
    }

    log.Println("Successfully connected to the database")
}

// GetDB returns the database connection.
func GetDB() *sqlx.DB {
    return db
}