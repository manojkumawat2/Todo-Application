package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Id        int
	FirstName string
	LastName  string
	Email     string
	Password  string
}

// Create a user
func CreateUser(db *gorm.DB, User *User) (err error) {
	err = db.Create(User).Error

	if err != nil {
		return err
	}

	return nil
}

// Get user by email and password
func GetUserByEmail(db *gorm.DB, email string) (User, error) {
	var user User

	err := db.Where("email = ?", email).First(&user).Error

	return user, err
}

func CheckIfUserExistByEmail(db *gorm.DB, email string) bool {
	var count int64

	db.Table("users").Select("id").Where("email = ?", email).Count(&count)

	return count > 0
}
