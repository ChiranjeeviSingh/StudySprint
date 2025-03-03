package config

import (
	"log"
	"os"
)

type Config struct {
	AWSRegion   string
	AWSEndpoint string
	JWTSecret   string
	DBConfig    postgresConfig
}

type postgresConfig struct {
	Host     string
	Port     string
	Username string
	Password string
	Dbname   string
}

var globalConfig *Config

// func LoadConfig() error {
// 	globalConfig = &Config{
// 		AWSRegion:   os.Getenv("AWS_REGION"),
// 		AWSEndpoint: os.Getenv("AWS_ENDPOINT"),
// 		JWTSecret:   "abcdefghijklmno",
// 		DBConfig: postgresConfig{
// 			Host:     "localhost",
// 			Port:     "5432",
// 			Username: "reshma",
// 			Password: "postgres",
// 			Dbname:   "app_db",
// 		},
// 	}
// 	return nil
// }

// func GetConfig() *Config {
//     return globalConfig
// }

func LoadConfig() error {
	globalConfig = &Config{
		AWSRegion:   os.Getenv("AWS_REGION"),
		AWSEndpoint: os.Getenv("AWS_ENDPOINT"),
		JWTSecret:   "abcdefghijklmno",
		DBConfig: postgresConfig{
			Host:     "localhost",
			Port:     "5432",
			Username: "reshma",
			Password: "postgres",
			Dbname:   "app_db",
		},
	}

	// Debugging: Print loaded configuration
	log.Printf("✅ Config Loaded: Host=%s, Port=%s, User=%s, DB=%s",
		globalConfig.DBConfig.Host,
		globalConfig.DBConfig.Port,
		globalConfig.DBConfig.Username,
		globalConfig.DBConfig.Dbname)

	return nil
}

func GetConfig() *Config {
	if globalConfig == nil {
		panic("❌ ERROR: Config is not initialized. Did you forget to call LoadConfig()?")
	}
	return globalConfig
}
