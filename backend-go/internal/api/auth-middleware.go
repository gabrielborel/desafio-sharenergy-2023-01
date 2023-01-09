package api

import (
	"strings"
	"time"

	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/config"
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

type Middleware struct {
	config *config.Settings
}

func (m Middleware) Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		tokenString := c.Request().Header.Get("Authorization")
		sanitizedToken := strings.ReplaceAll(tokenString, "Bearer ", "")
		if tokenString == "" {
			return echo.ErrUnauthorized
		}

		type Claims struct {
			Exp int `json:"exp"`
			jwt.StandardClaims
		}

		token, err := jwt.ParseWithClaims(sanitizedToken, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(m.config.JwtSecret), nil
		})
		if err != nil {
			return echo.ErrUnauthorized
		}

		expired := token.Claims.(*Claims).Exp < int(time.Now().Unix())

		if token.Valid && !expired {
			return next(c)
		} else {
			return echo.ErrUnauthorized
		}
	}
}
