package api

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (a App) GetRandomDogImage(c echo.Context) error {
	image, err := a.dogsUseCase.GetRandomImage()
	if err != nil {
		return c.JSON(err.Code, err.Message)
	}

	return c.JSON(http.StatusFound, image)
}
