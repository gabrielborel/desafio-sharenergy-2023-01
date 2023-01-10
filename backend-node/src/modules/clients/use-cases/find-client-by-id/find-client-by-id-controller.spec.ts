import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../../../../app";
import { Client } from "../../entities/client";
import { AuthenticateUseCase } from "../../../authentication/use-cases/authenticate/authenticate-use-case";

describe("Find Client By Id Controller", () => {
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

  it("should be able find a client by id", async () => {
    const { body: createdClient } = await request(app)
      .post("/clients")
      .send({ ...clientData })
      .set({ Authorization: `Bearer ${accessToken}` });

    const { body: client } = await request(app)
      .get(`/clients/${createdClient.id}`)
      .send()
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(client.id).toBe(createdClient.id);
  });
});
