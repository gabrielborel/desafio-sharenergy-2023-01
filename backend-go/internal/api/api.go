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
	cfg                 *config.Settings
	clientsUseCases     usecases.IClientsUseCases
	authenticateUseCase usecases.IAuthenticateUseCase
	dogsUseCase         usecases.IDogsUseCase
	usersUseCase        usecases.IUsersUseCase
	catsUseCase         usecases.ICatsUseCase
}

func New(cfg *config.Settings, client *mongo.Client) *App {
	server := echo.New()
	server.Use(middleware.Recover())

	clientsRepo := data.NewClientsRepository(cfg, client)
	clientsUseCase := usecases.NewClientsUseCases(cfg, clientsRepo)
	authenticateUseCase := usecases.NewAuthenticateUseCase(cfg)
	dogsUseCase := usecases.NewDogsUseCase(cfg)
	usersUseCase := usecases.NewUsersUseCase(cfg)
	catsUseCase := usecases.NewCatsUseCase(cfg)

	return &App{
		server,
		cfg,
		clientsUseCase,
		authenticateUseCase,
		dogsUseCase,
		usersUseCase,
		catsUseCase,
	}
}

func (a App) ConfigureRoutes() {
	a.server.POST("/authenticate", a.Authenticate)

	protected := a.server.Group("/")
	middleware := Middleware{config: a.cfg}
	protected.Use(middleware.Auth)

	protected.GET("clients", a.FindAll)
	protected.POST("clients", a.Create)
	protected.GET("clients/:id", a.FindById)
	protected.DELETE("clients/:id", a.Delete)
	protected.PUT("clients/:id", a.Update)
	protected.GET("dogs", a.GetRandomDogImage)
	protected.GET("users", a.GetRandomUsers)
	protected.GET("cats/:code", a.GetCatImageByStatusCode)
}

func (a App) Start() {
	a.ConfigureRoutes()
	a.server.Start(":3000")
}
