package api

import (
	"net/http"

	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/models"
	"github.com/labstack/echo/v4"
)

func (a App) Create(c echo.Context) error {
	newClient, err := models.ValidateRegisterClientRequest(c)
	if err != nil {
		return c.JSON(err.Code, err)
	}

	client, err := a.clientsUseCases.CreateClient(newClient)
	if err != nil {
		return c.JSON(err.Code, err)
	}

	return c.JSON(http.StatusCreated, client)
}

func (a App) FindById(c echo.Context) error {
	id := c.Param("id")

	client, err := a.clientsUseCases.FindById(id)
	if err != nil {
		return c.JSON(err.Code, err)
	}

	return c.JSON(http.StatusOK, client)
}

func (a App) FindAll(c echo.Context) error {
	clients, err := a.clientsUseCases.FindAll()
	if err != nil {
		return c.JSON(err.Code, err)
	}

	return c.JSON(http.StatusOK, clients)
}

func (a App) Delete(c echo.Context) error {
	id := c.Param("id")

	client, err := a.clientsUseCases.DeleteClient(id)
	if err != nil {
		return c.JSON(err.Code, err)
	}

	return c.JSON(http.StatusCreated, client)
}

func (a App) Update(c echo.Context) error {
	id := c.Param("id")
	clientToUpdate, err := models.ValidateUpdateClientRequest(c)
	if err != nil {
		return c.JSON(err.Code, err)
	}

	client, err := a.clientsUseCases.UpdateClient(id, clientToUpdate)
	if err != nil {
		return c.JSON(err.Code, err)
	}

	return c.JSON(http.StatusCreated, client)
}
