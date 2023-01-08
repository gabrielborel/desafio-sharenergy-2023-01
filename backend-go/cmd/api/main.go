package main

import (
	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/internal/api"
	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/config"
	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/data"
)

func main() {
	cfg := config.New()
	db := data.NewMongoConnection(cfg)
	defer db.Disconnect()

	app := api.New()
	app.Start()
}
