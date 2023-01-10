package domain

import "go.mongodb.org/mongo-driver/bson/primitive"

type Client struct {
	ID        primitive.ObjectID `bson:"_id"`
	Name      string             `json:"name"`
	Email     string             `json:"email"`
	Cpf       string             `json:"cpf"`
	Cellphone string             `json:"cellphone"`
	Address   string             `json:"address"`
}
