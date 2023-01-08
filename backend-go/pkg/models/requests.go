package models

import (
	"net/mail"

	"github.com/gabrielborel/desafio-sharenergy-2023-01/backend-go/pkg/domain"
	"github.com/labstack/echo/v4"
)

type RegisterClientRequest struct {
	Name      string `json:"name"`
	Email     string `json:"email"`
	Cpf       string `json:"cpf"`
	Cellphone string `json:"cellphone"`
	Address   string `json:"address"`
}

type AuthenticateRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func ValidateRegisterClientRequest(c echo.Context) (*domain.Client, *Error) {
	registerClientRequest := new(RegisterClientRequest)
	if err := c.Bind(registerClientRequest); err != nil {
		return nil, BindError()
	}

	var validationErrors []string

	if len(registerClientRequest.Name) < 5 {
		validationErrors = append(validationErrors, "O nome deve ter no mínimo 5 caracteres.")
	}

	if len(registerClientRequest.Name) > 30 {
		validationErrors = append(validationErrors, "O nome deve ter no máximo 30 caracteres.")
	}

	validEmail, isValid := validateEmail(registerClientRequest.Email)
	if !isValid {
		validationErrors = append(validationErrors, "Email inválido")
	}

	if len(registerClientRequest.Cpf) != 11 {
		validationErrors = append(validationErrors, "CPF deve ter 11 dígitos.")
	}

	if len(registerClientRequest.Cellphone) > 11 || len(registerClientRequest.Cellphone) < 9 {
		validationErrors = append(validationErrors, "Telefone deve ter entre 9 e 11 dígitos.")
	}

	if len(registerClientRequest.Address) < 20 || len(registerClientRequest.Address) > 70 {
		validationErrors = append(validationErrors, "Endereço deve ter entre 20 e 70 dígitos.")
	}

	if len(validationErrors) > 0 {
		return nil, ValidationError(validationErrors)
	}

	return &domain.Client{
		Name:      registerClientRequest.Name,
		Email:     validEmail,
		Cpf:       registerClientRequest.Cpf,
		Cellphone: registerClientRequest.Cellphone,
		Address:   registerClientRequest.Address,
	}, nil
}

func ValidateAuthenticateRequest(c echo.Context) (bool, *Error) {
	authRequest := new(AuthenticateRequest)
	if err := c.Bind(authRequest); err != nil {
		return false, BindError()
	}

	var validationErrors []string

	if len(authRequest.Password) < 8 || len(authRequest.Password) > 16 {
		validationErrors = append(validationErrors, "Senha deve ter entre 8 e 16 caracteres.")
	}

	if len(authRequest.Username) < 5 || len(authRequest.Username) > 25 {
		validationErrors = append(validationErrors, "Nome de usuário deve ter entre 5 e 25 caracteres.")
	}

	if len(validationErrors) > 0 {
		return false, ValidationError(validationErrors)
	}

	return true, nil
}

func validateEmail(address string) (string, bool) {
	addr, err := mail.ParseAddress(address)
	if err != nil {
		return "", false
	}

	return addr.Address, true
}
