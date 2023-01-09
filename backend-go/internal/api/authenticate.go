package api

import (
	"net/http"

	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/models"
	"github.com/labstack/echo/v4"
)

func (a App) Authenticate(c echo.Context) error {
	data, err := models.ValidateAuthenticateRequest(c)
	if err != nil {
		return c.JSON(err.Code, err)
	}

	username := data["username"].(string)
	password := data["password"].(string)

	token, err := a.authenticateUseCase.Authenticate(username, password)
	if err != nil {
		return c.JSON(err.Code, map[string]interface{}{"message": err.Message})
	}

	return c.JSON(http.StatusCreated, map[string]interface{}{"token": token})
}
