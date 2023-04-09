package main

import (
	"net/http"
	"todo/middlewares"
	"todo/routes"

	"github.com/gin-gonic/gin"
)

var authenticationSecretKey = []byte("akldsjflakdjflkasdjfladsf")

func main() {
	r := gin.Default()

	authRoutes := r.Group("/", middlewares.Authentication())

	authRoutes.GET("/", func(ctx *gin.Context) {
		ctx.JSON(
			http.StatusOK,
			gin.H{
				"message": "Hello World",
			},
		)
	})

	r.POST("/login", routes.Login)
	r.POST("/register", routes.Register)

	r.Run(":2001")
}
