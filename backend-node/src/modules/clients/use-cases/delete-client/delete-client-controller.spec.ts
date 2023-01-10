import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../../../../app";
import { Client } from "../../entities/client";
import { AuthenticateUseCase } from "../../../authentication/use-cases/authenticate/authenticate-use-case";

describe("Delete Client Controller", () => {
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

  it("should be able to delete a client", async () => {
    const createdClient = await request(app)
      .post("/clients")
      .send({ ...clientData })
      .set({ Authorization: `Bearer ${accessToken}` });

    await request(app)
      .delete(`/clients/${createdClient.body.id}`)
      .send()
      .set({ Authorization: `Bearer ${accessToken}` });

    const { body: clients } = await request(app)
      .get(`/clients`)
      .send()
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(clients.length).toBeFalsy();
    expect(clients.length).toBe(0);
  });
});
