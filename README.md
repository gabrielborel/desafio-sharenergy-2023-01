# Desafio para o processo seletivo SHARENERGY 2023/01

## Aplicação desenvolvida por: [@gabrielborel](https://github.com/gabrielborel)

<br>

# A aplicação:

A aplicação foi elaborada conforme as especificações passadas pelo README original.

### Front-end

- React + Typescript
- Tailwind CSS
- Vite
- e outras libs de auxílio...

### Back-end em Node

- Node + Typescript
- Jest + Supertest
- Express
- MongoDB
- Mongoose
- e outras libs de auxílio...

### Back-end em GO

- Golang
- Echo
- e outras libs de auxílio...

# Instalação
Para instalar a aplicação é necessário utilizar o Docker. Para instalá-lo em sua máquina, você consegue instruções neste [endereço](https://www.docker.com/get-started/).

Uma vez o Docker instalado, realize o clone do projeto através do seguinte comando em um terminal
```
git clone https://github.com/gabrielborel/desafio-sharenergy-2023-01.git
```
 Acesse a pasta do projeto e mude para a branch correta
```
cd desafio-sharenergy-2023-01
git checkout gabriel-fonseca-borel
```
 Realize um pull desse repositório
```
git pull origin gabriel-fonseca-borel
```
Agora você terá 3 pastas baixadas, backend-node, backend-go e frontend. Para rodar o projeto basta mudar para o diretório do backend que você quiser
```
cd backend-node ou cd backend-go
```

Crie um arquivo .env na pasta do backend selecionado, e popule esse .env com exatamente o mesmo conteúdo do arquivo .env.example
```
O ARQUIVO .ENV DEVE TER ESSE CONTEÚDO

DB_HOST=db
DB_PORT=27017
DB_NAME=share_energy
JWT_SECRET=92eb5ffee6ae2fec3ad71c777531578f
JWT_EXPIRES=7
```

Agora com as variáveis de ambientes setadas, basta rodar o comando
```
docker-compose up
```
Que irá subir o banco de dados, a aplicação backend da sua escolha (Node ou Golang) e o frontend.
Basta acessar a url
```
frontend: localhost:5173
backend: localhost:3000
```
### Certifique-se de matar a aplicação com o comando
```
docker-compose down
```
Antes de realizar o teste em outro backend, para não ter conflitos

# Vídeo explicativo
Segue o endereço do vídeo explicativo sobre o que foi desenvolvido e como instalar:

[Desafio Sharenergy por Gabriel Borel](https://youtu.be/i7SsrfeF6gA)
