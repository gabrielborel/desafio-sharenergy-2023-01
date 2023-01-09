package api

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (a App) GetCatImageByStatusCode(c echo.Context) error {
	code := c.Param("code")
	users, err := a.catsUseCase.GetCatImageByStatusCode(code)
	if err != nil {
		return c.JSON(err.Code, err.Message)
	}

	return c.JSON(http.StatusFound, users)
}
