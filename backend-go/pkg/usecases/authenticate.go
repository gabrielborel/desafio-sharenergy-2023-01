package usecases

import (
	"fmt"
	"strconv"
	"time"

	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/config"
	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/models"
	"github.com/golang-jwt/jwt"
)

const (
	CORRECT_USERNAME = "desafiosharenergy"
	CORRECT_PASSWORD = "sh@r3n3rgy"
)

type IAuthenticateUseCase interface {
	Authenticate(username, password string) (string, *models.Error)
}

type AuthenticateUseCase struct {
	cfg *config.Settings
}

func NewAuthenticateUseCase(cfg *config.Settings) IAuthenticateUseCase {
	return &AuthenticateUseCase{cfg}
}

func (a AuthenticateUseCase) Authenticate(username, password string) (string, *models.Error) {
	if username != CORRECT_USERNAME || password != CORRECT_PASSWORD {
		return "", &models.Error{
			Code:    400,
			Name:    "INVALID_CREDENTIALS",
			Message: "Email ou senha incorretos.",
		}
	}

	token := jwt.New(jwt.SigningMethodHS256)
	expiresAt, err := strconv.ParseInt(a.cfg.JwtExpires, 10, 64)
	if err != nil {
		return "", &models.Error{
			Code:    400,
			Name:    "BAD_REQUEST",
			Message: "Something went wrong",
			Error:   err,
		}
	}

	expiration := time.Duration(int64(time.Minute) * expiresAt)

	claims := token.Claims.(jwt.MapClaims)
	claims["exp"] = time.Now().Add(expiration).Unix()
	t, err := token.SignedString([]byte(a.cfg.JwtSecret))
	fmt.Println(t)
	if err != nil {
		fmt.Println(err.Error())
		return "", &models.Error{
			Code:    400,
			Name:    "BAD_REQUEST",
			Message: "Error signing JWT Token",
			Error:   err,
		}
	}

	return t, nil
}
