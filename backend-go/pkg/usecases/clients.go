package usecases

import (
	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/config"
	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/data"
	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/domain"
	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type IClientsUseCases interface {
	CreateClient(client *domain.Client) (*domain.Client, *models.Error)
	FindById(id string) (*domain.Client, *models.Error)
	FindAll() ([]*domain.Client, *models.Error)
	DeleteClient(id string) (bool, *models.Error)
}

type ClientsUseCase struct {
	clientsRepository data.IClientsRepository
	cfg               *config.Settings
}

func NewClientsUseCases(cfg *config.Settings, clientsRepo data.IClientsRepository) IClientsUseCases {
	return &ClientsUseCase{
		clientsRepository: clientsRepo,
		cfg:               cfg,
	}
}

func (c ClientsUseCase) CreateClient(client *domain.Client) (*domain.Client, *models.Error) {
	emailAlreadyInUse, err := c.clientsRepository.EmailAlreadyInUse(client.Email)

	if err != nil {
		return nil, &models.Error{
			Code:    500,
			Name:    "SERVER_ERROR",
			Message: "Something went wrong",
			Error:   err,
		}
	}
	if emailAlreadyInUse {
		return nil, &models.Error{
			Code:    400,
			Name:    "EMAIL_TAKEN",
			Message: "Email already in use",
		}
	}

	client.ID = primitive.NewObjectID()
	createdClient, err := c.clientsRepository.CreateClient(client)
	if err != nil {
		return nil, &models.Error{
			Code:    500,
			Name:    "SERVER_ERROR",
			Message: "Something went wrong",
			Error:   err,
		}
	}

	return createdClient, nil
}

func (c ClientsUseCase) FindById(id string) (*domain.Client, *models.Error) {
	clientFound, err := c.clientsRepository.FindById(id)
	if err != nil {
		return nil, &models.Error{
			Code:    500,
			Name:    "SERVER_ERROR",
			Message: "Something went wrong",
			Error:   err,
		}
	}

	return clientFound, nil
}

func (c ClientsUseCase) FindAll() ([]*domain.Client, *models.Error) {
	allClients, err := c.clientsRepository.FindAll()
	if err != nil {
		return nil, &models.Error{
			Code:    500,
			Name:    "SERVER_ERROR",
			Message: "Something went wrong",
			Error:   err,
		}
	}

	return allClients, nil
}

func (c ClientsUseCase) DeleteClient(id string) (bool, *models.Error) {
	deleted, err := c.clientsRepository.DeleteClient(id)
	if err != nil {
		return false, &models.Error{
			Code:    500,
			Name:    "SERVER_ERROR",
			Message: "Something went wrong",
			Error:   err,
		}
	}

	return deleted, nil
}
