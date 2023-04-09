package middlewares

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

// JWT Secret Key
var authenticationSecretKey = []byte("akldsjflakdjflkasdjfladsf")

// Authentication middleware function
func Authentication() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		err := verifyJWT(ctx)

		if err != nil {
			ctx.JSON(
				http.StatusUnauthorized,
				gin.H{
					"error": err.Error(),
				},
			)
			ctx.Abort()
		}

		ctx.Next()
	}
}

// Generate a new JWT Token
func GenerateJWT(email string) (string, error) {

	token := jwt.New(jwt.SigningMethodHS256)

	// Add Claims to the token
	claimns := token.Claims.(jwt.MapClaims)
	claimns["email"] = email
	claimns["exp"] = time.Now().Add(time.Minute * 30).Unix()

	// generate a final jwt token string
	tokenString, err := token.SignedString(authenticationSecretKey)

	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// Verify JWT token
func verifyJWT(ctx *gin.Context) error {
	recievedToken := ctx.Request.Header["Token"]

	if recievedToken == nil {
		return fmt.Errorf("You are not authorized!")
	}

	token, err := jwt.Parse(recievedToken[0], func(t *jwt.Token) (interface{}, error) {
		_, ok := t.Method.(*jwt.SigningMethodHMAC)

		if !ok {
			return nil, fmt.Errorf("You are not authorized!")
		}

		return authenticationSecretKey, nil
	})

	if err != nil {
		return fmt.Errorf("You are not authorized!")
	}

	if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return nil
	}

	return fmt.Errorf("You are not authorized!")
}
