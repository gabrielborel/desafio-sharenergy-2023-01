package api

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (a App) GetRandomUsers(c echo.Context) error {
	users, err := a.usersUseCase.GetRandomUsers()
	if err != nil {
		return c.JSON(err.Code, err.Message)
	}

	return c.JSON(http.StatusOK, users)
}
