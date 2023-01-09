package usecases

import (
	"encoding/base64"
	"io"
	"net/http"

	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/config"
	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/models"
)

type ICatsUseCase interface {
	GetCatImageByStatusCode(code string) (string, *models.Error)
}

type CatsUseCase struct {
	cfg *config.Settings
}

func NewCatsUseCase(cfg *config.Settings) ICatsUseCase {
	return &CatsUseCase{cfg}
}

func (d CatsUseCase) GetCatImageByStatusCode(code string) (string, *models.Error) {
	res, err := http.Get("https://http.cat/" + code)
	if res.StatusCode != 200 {
		return "", &models.Error{
			Code:    res.StatusCode,
			Name:    "SERVER_ERROR",
			Message: err.Error(),
			Error:   err,
		}
	}

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

	return base64.StdEncoding.EncodeToString(data), nil
}
