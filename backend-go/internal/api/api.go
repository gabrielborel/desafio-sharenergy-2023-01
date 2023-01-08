package api

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type App struct {
	server *echo.Echo
}

func New() *App {
	server := echo.New()
	server.Use(middleware.Recover())
	return &App{server}
}

func (a App) ConfigureRoutes() {
}

func (a App) Start() {
	a.ConfigureRoutes()
	a.server.Start(":3000")
}
