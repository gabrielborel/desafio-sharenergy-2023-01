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
	server              *echo.Echo
	clientsUseCases     usecases.IClientsUseCases
	authenticateUseCase usecases.IAuthenticateUseCase
	cfg                 *config.Settings
}

func New(cfg *config.Settings, client *mongo.Client) *App {
	server := echo.New()
	server.Use(middleware.Recover())

	clientsRepo := data.NewClientsRepository(cfg, client)
	clientsUseCase := usecases.NewClientsUseCases(cfg, clientsRepo)
	authenticateUseCase := usecases.NewAuthenticateUseCase(cfg)

	return &App{server, clientsUseCase, authenticateUseCase, cfg}
}

func (a App) ConfigureRoutes() {
	a.server.GET("/clients", a.FindAll)
	a.server.POST("/clients", a.Create)
	a.server.GET("/clients/:id", a.FindById)
	a.server.DELETE("/clients/:id", a.Delete)
	a.server.PUT("/clients/:id", a.Update)
	a.server.POST("/authenticate", a.Authenticate)
}

func (a App) Start() {
	a.ConfigureRoutes()
	a.server.Start(":3000")
}
