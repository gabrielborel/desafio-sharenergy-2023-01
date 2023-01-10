package usecases

import (
	"io"
	"net/http"

	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/config"
	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/models"
)

type IDogsUseCase interface {
	GetRandomImage() (string, *models.Error)
}

type DogsUseCase struct {
	cfg *config.Settings
}

func NewDogsUseCase(cfg *config.Settings) IDogsUseCase {
	return &DogsUseCase{cfg}
}

func (d DogsUseCase) GetRandomImage() (string, *models.Error) {
	res, err := http.Get("https://random.dog/woof?filter=mp4,webm")
	if err != nil {
		return "", &models.Error{
			Code:    res.StatusCode,
			Name:    "SERVER_ERROR",
			Message: err.Error(),
			Error:   err,
		}
	}

	data, err := io.ReadAll(res.Body)
	if err != nil {
		return "", &models.Error{
			Code:    res.StatusCode,
			Name:    "SERVER_ERROR",
			Message: err.Error(),
			Error:   err,
		}
	}

	res.Body.Close()

	return string(data), nil
}
