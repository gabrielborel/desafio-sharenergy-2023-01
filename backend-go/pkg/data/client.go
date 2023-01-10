package data

import (
	"context"

	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/config"
	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/domain"
	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/models"
	"github.com/pkg/errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type IClientsRepository interface {
	CreateClient(client *domain.Client) (*domain.Client, error)
	EmailAlreadyInUse(email string) (bool, error)
	CpfAlreadyInUse(cpf string) (bool, error)
	FindById(id string) (*domain.Client, error)
	FindAll() ([]*domain.Client, error)
	DeleteClient(id string) (bool, error)
	UpdateClient(id string, client *models.UpdateClientRequest) (*domain.Client, error)
}

type ClientsRepository struct {
	clientCollection *mongo.Collection
	ctx              context.Context
}

func NewClientsRepository(cfg *config.Settings, mongo *mongo.Client) IClientsRepository {
	clientCollection := mongo.Database(cfg.DbName).Collection("clients")
	return &ClientsRepository{
		clientCollection: clientCollection,
		ctx:              context.TODO(),
	}
}

func (c ClientsRepository) CreateClient(client *domain.Client) (*domain.Client, error) {
	res, err := c.clientCollection.InsertOne(c.ctx, client)
	if err != nil {
		return nil, errors.Wrap(err, "Error ao inserir cliente")
	}

	var createdClient domain.Client
	c.clientCollection.FindOne(c.ctx, res.InsertedID).Decode(&createdClient)
	return client, nil
}

func (c ClientsRepository) EmailAlreadyInUse(email string) (bool, error) {
	var emailFound *domain.Client
	filter := bson.D{primitive.E{Key: "email", Value: email}}

	if err := c.clientCollection.FindOne(c.ctx, filter).Decode(&emailFound); err != nil {
		if err == mongo.ErrNoDocuments {
			return false, nil
		}
		return false, errors.Wrap(err, "Error ao procurar por email")
	}

	return true, nil
}

func (c ClientsRepository) CpfAlreadyInUse(cpf string) (bool, error) {
	var cpfFound *domain.Client
	filter := bson.D{primitive.E{Key: "cpf", Value: cpf}}

	if err := c.clientCollection.FindOne(c.ctx, filter).Decode(&cpfFound); err != nil {
		if err == mongo.ErrNoDocuments {
			return false, nil
		}
		return false, errors.Wrap(err, "Error ao procurar por cpf")
	}

	return true, nil
}

func (c ClientsRepository) FindById(id string) (*domain.Client, error) {
	var clientFound *domain.Client
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errors.Wrap(err, "Id inválido")
	}

	filter := bson.D{primitive.E{Key: "_id", Value: objectId}}

	if err := c.clientCollection.FindOne(c.ctx, filter).Decode(&clientFound); err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, errors.Wrap(err, "Error ao procurar por id")
	}

	return clientFound, nil
}

func (c ClientsRepository) FindAll() ([]*domain.Client, error) {
	var clientsFound []*domain.Client

	cursor, err := c.clientCollection.Find(c.ctx, bson.M{})
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}

		return nil, errors.Wrap(err, "Erro ao procurar clientes")
	}

	err = cursor.All(c.ctx, &clientsFound)
	if err != nil {
		return nil, errors.Wrap(err, "Erro ao procurar clientes")
	}

	return clientsFound, nil
}

func (c ClientsRepository) DeleteClient(id string) (bool, error) {
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return false, errors.Wrap(err, "Id inválido")
	}

	filter := bson.D{primitive.E{Key: "_id", Value: objectId}}
	res, err := c.clientCollection.DeleteOne(c.ctx, filter)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return false, nil
		}

		return false, errors.Wrap(err, "Erro ao deletar cliente")
	}

	if res.DeletedCount == 0 {
		return false, nil
	}

	return true, nil
}

func (c ClientsRepository) UpdateClient(id string, client *models.UpdateClientRequest) (*domain.Client, error) {
	var updatedClient *domain.Client

	clientToBeUpdated, err := c.FindById(id)
	if err != nil {
		return nil, errors.Wrap(err, "Cliente não encontrado")
	}

	filter := bson.D{primitive.E{Key: "email", Value: clientToBeUpdated.Email}}
	err = c.clientCollection.FindOneAndUpdate(c.ctx, filter, bson.M{"$set": client}).Decode(&updatedClient)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}

		return nil, errors.Wrap(err, "Erro ao atualizar cliente")
	}

	updatedClient, _ = c.FindById(id)

	return updatedClient, nil
}
