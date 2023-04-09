package routes

import (
	"net/http"
	"quiz/helpers"
	"quiz/middlewares"
	"quiz/models"

	"github.com/gin-gonic/gin"
)

// Login form data
type LoginData struct {
	Email    string `form:"email" json:"email" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
}

// Register form data
type RegisterData struct {
	FirstName string `form:"first_name" json:"first_name" binding:"required"`
	LastName  string `form:"last_name" json:"last_name" binding:"required"`
	Email     string `form:"email" json:"email" binding:"required"`
	Password  string `form:"passwrod" json:"password" binding:"required"`
}

// Login Route Handler
func Login(ctx *gin.Context) {
	// Extract Form Data
	var loginData LoginData

	if err := ctx.ShouldBindJSON(&loginData); err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{
				"error": err.Error(),
			},
		)
		return
	}

	db := helpers.InitDB()

	user, err := models.GetUserByEmail(db, loginData.Email)

	if err != nil {
		ctx.JSON(
			http.StatusNotFound,
			gin.H{
				"message": "Invalid username or password!1",
			},
		)
		return
	}

	if !helpers.CheckPasswordHash(loginData.Password, user.Password) {
		ctx.JSON(
			http.StatusNotFound,
			gin.H{
				"message": "Invalid username or password!2",
			},
		)
		return
	}

	// Generate a new JWT Token
	tokenString, err := middlewares.GenerateJWT(loginData.Email)

	if err != nil {
		ctx.JSON(
			http.StatusNotFound,
			gin.H{
				"message": err.Error(),
			},
		)
		return
	}

	// Set Token in the header
	ctx.Header("Token", tokenString)

	// Send the the token to the client
	ctx.JSON(
		http.StatusOK,
		gin.H{
			"message": "Authenticated Successfully!",
			"token":   tokenString,
		},
	)
}

// Route handler for new registration
func Register(ctx *gin.Context) {
	// extract form data
	var registerData RegisterData

	if err := ctx.ShouldBindJSON(&registerData); err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{
				"error": err.Error(),
			},
		)
		return
	}

	db := helpers.InitDB()

	// Verify if user already exist or not
	isUserExist := models.CheckIfUserExistByEmail(db, registerData.Email)

	if isUserExist {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{
				"error": "User already exist!",
			},
		)
		return
	}

	// Hash the password
	hashPassword, err := helpers.HashPassword(registerData.Password)

	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{
				"error": "Something went wrong please try again!",
			},
		)
		return
	}

	// Store user information into the database
	user := models.User{
		FirstName: registerData.FirstName,
		LastName:  registerData.LastName,
		Email:     registerData.Email,
		Password:  hashPassword,
	}

	models.CreateUser(db, &user)

	// Generate a new JWT Token
	tokenString, err := middlewares.GenerateJWT(registerData.Email)

	if err != nil {
		ctx.JSON(
			http.StatusNotFound,
			gin.H{
				"message": err.Error(),
			},
		)
		return
	}

	// Set Token in the header
	ctx.Header("Token", tokenString)

	// Send the the token to the client
	ctx.JSON(
		http.StatusOK,
		gin.H{
			"message": "Authenticated Successfully!",
			"token":   tokenString,
		},
	)
}
