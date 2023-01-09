package api

import (
	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/config"
	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/data"
	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/usecases"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.mongodb.org/mongo-driver/mongo"
)

type App struct {
	server          *echo.Echo
	clientsUseCases usecases.IClientsUseCases
	cfg             *config.Settings
}

func New(cfg *config.Settings, client *mongo.Client) *App {
	server := echo.New()
	server.Use(middleware.Recover())

	clientsRepo := data.NewClientsRepository(cfg, client)
	clientsUseCase := usecases.NewClientsUseCases(cfg, clientsRepo)

	return &App{server, clientsUseCase, cfg}
}

func (a App) ConfigureRoutes() {
	a.server.GET("/clients", a.FindAll)
	a.server.POST("/clients", a.Create)
	a.server.GET("/clients/:id", a.FindById)
}

func (a App) Start() {
	a.ConfigureRoutes()
	a.server.Start(":3000")
}
