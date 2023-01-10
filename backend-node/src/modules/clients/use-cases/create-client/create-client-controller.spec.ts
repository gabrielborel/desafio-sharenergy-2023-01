import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../../../../app";
import { Client } from "../../entities/client";
import { AuthenticateUseCase } from "../../../authentication/use-cases/authenticate/authenticate-use-case";

describe("Create Client Controller", () => {
  let mongoServer: MongoMemoryServer;
  let authenticateUseCase: AuthenticateUseCase;
  let accessToken: string;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoose.connect(mongoServer.getUri());
    authenticateUseCase = new AuthenticateUseCase();

    const { token } = await authenticateUseCase.execute({
      username: "desafiosharenergy",
      password: "sh@r3n3rgy",
    });
    accessToken = token;
  });

  afterAll(async () => {
    if (mongoServer) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongoServer.stop();
    }
  });

  afterEach(async () => {
    if (mongoServer) {
      const collections = await mongoose.connection.db.collections();
      for (let collection of collections) {
        await collection.drop();
      }
    }
  });

  const clientData = new Client({
    name: "Gabriel Borel",
    email: "biel_borel@hotmail.com",
    address: "Volta Redonda, Rj",
    cellphone: "24999899256",
    cpf: "19252283714",
  });

  it("should be able to create a client", async () => {
    const res = await request(app)
      .post("/clients")
      .send({ ...clientData })
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res.body).toHaveProperty("id");
  });

  it("should not be able to create a client with a existing email", async () => {
    await request(app)
      .post("/clients")
      .send({ ...clientData })
      .set({ Authorization: `Bearer ${accessToken}` });

    const res = await request(app)
      .post("/clients")
      .send({ ...clientData })
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res.body.message).toBe("Email já está em uso.");
  });

  it("should not be able to create a client with a existing cpf", async () => {
    await request(app)
      .post("/clients")
      .send({ ...clientData, email: "outro@email.com" })
      .set({ Authorization: `Bearer ${accessToken}` });

    const res = await request(app)
      .post("/clients")
      .send({ ...clientData })
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res.body.message).toBe("CPF já está em uso.");
  });

  it("should not be able to create a client with name length less than 5", async () => {
    const res = await request(app)
      .post("/clients")
      .send({ ...clientData, name: "A".repeat(4) })
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res.body).toHaveProperty("issues");
    expect(res.statusCode).toBe(400);
  });

  it("should not be able to create a client with name length more than 30", async () => {
    const res = await request(app)
      .post("/clients")
      .send({ ...clientData, name: "A".repeat(31) })
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res.body).toHaveProperty("issues");
    expect(res.statusCode).toBe(400);
  });

  it("should not be able to create a client with invalid email", async () => {
    const res = await request(app)
      .post("/clients")
      .send({ ...clientData, email: "testeeeee" })
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res.body).toHaveProperty("issues");
    expect(res.statusCode).toBe(400);
  });

  it("should not be able to create a client with cellphone length less than 9", async () => {
    const res = await request(app)
      .post("/clients")
      .send({ ...clientData, cellphone: "1".repeat(8) })
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res.body).toHaveProperty("issues");
    expect(res.statusCode).toBe(400);
  });

  it("should not be able to create a client with cellphone length more than 11", async () => {
    const res = await request(app)
      .post("/clients")
      .send({ ...clientData, cellphone: "1".repeat(12) })
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res.body).toHaveProperty("issues");
    expect(res.statusCode).toBe(400);
  });

  it("should not be able to create a client with cpf length different than 11", async () => {
    const res = await request(app)
      .post("/clients")
      .send({ ...clientData, cpf: "1".repeat(12) })
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res.body).toHaveProperty("issues");
    expect(res.statusCode).toBe(400);
  });

  it("should not be able to create a client with address length less than 10", async () => {
    const res = await request(app)
      .post("/clients")
      .send({ ...clientData, address: "a".repeat(9) })
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res.body).toHaveProperty("issues");
    expect(res.statusCode).toBe(400);
  });

  it("should not be able to create a client with address length more than 70", async () => {
    const res = await request(app)
      .post("/clients")
      .send({ ...clientData, address: "a".repeat(71) })
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res.body).toHaveProperty("issues");
    expect(res.statusCode).toBe(400);
  });
});
