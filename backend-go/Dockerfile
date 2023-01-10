FROM golang:1.19

WORKDIR /app

COPY . .
RUN go build -o backend-go cmd/api/main.go

EXPOSE 3000

CMD ["./backend-go"]
