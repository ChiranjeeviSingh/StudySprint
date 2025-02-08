package models

type User struct {
    ID                int  `json:"id,omitempty" db:"id"`
    Username          string `json:"username,omitempty" db:"username"` 
    PasswordHash      string `json:"password_hash,omitempty" db:"password_hash"`
    Email             string `json:"email,omitempty" db:"email"`
    CreatedAt         string `json:"created_at,omitempty" db:"created_at"`
    UpdatedAt         string `json:"updated_at,omitempty" db:"updated_at"`
}