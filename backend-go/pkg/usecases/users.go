package usecases

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/config"
	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/models"
)

type IUsersUseCase interface {
	GetRandomUsers() (interface{}, *models.Error)
}

type UsersUseCase struct {
	cfg *config.Settings
}

func NewUsersUseCase(cfg *config.Settings) IUsersUseCase {
	return &UsersUseCase{cfg}
}

func (u UsersUseCase) GetRandomUsers() (interface{}, *models.Error) {
	res, err := http.Get("https://randomuser.me/api/?results=52")
	if err != nil {
		return "", &models.Error{
			Code:    res.StatusCode,
			Name:    "SERVER_ERROR",
			Message: err.Error(),
			Error:   err,
		}
	}

	data, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return "", &models.Error{
			Code:    res.StatusCode,
			Name:    "SERVER_ERROR",
			Message: err.Error(),
			Error:   err,
		}
	}

	res.Body.Close()

	var users interface{}
	json.Unmarshal(data, &users)
	return users, nil
}
