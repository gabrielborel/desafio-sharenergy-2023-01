import { clientModel } from "./../../schemas/client";
import { IClientsRepository } from "../clients-repository";
import { Client } from "../../entities/client";
import { ObjectId } from "mongodb";
import { ClientMapper } from "../../mappers/client-mapper";

export interface MongodbClient {
  _id: ObjectId;
  name: string;
  email: string;
  cpf: string;
  cellphone: string;
  address: string;
}

export class MongodbClientsRepository implements IClientsRepository {
  async create(client: Client): Promise<Client> {
    const createdClient = await clientModel.create(client);
    return ClientMapper.toDomain(createdClient);
  }

  async findByEmail(email: string): Promise<Client | null> {
    const client = await clientModel.findOne({ email });
    if (!client) return null;

    return ClientMapper.toDomain(client);
  }

  async findByCpf(cpf: string): Promise<Client | null> {
    const client = await clientModel.findOne({ cpf });
    if (!client) return null;

    return ClientMapper.toDomain(client);
  }

  async findAll(): Promise<Client[]> {
    const clients = await clientModel.find();
    console.log(clients);
    return clients.map(ClientMapper.toDomain);
  }

  async findById(id: string): Promise<Client | null> {
    const client = await clientModel.findById(id.trim());
    if (!client) return null;

    return ClientMapper.toDomain(client);
  }

  async delete(id: string): Promise<void> {
    await clientModel.findByIdAndDelete(id.trim());
  }

  async update(id: string, data: Partial<Client>): Promise<Client | null> {
    const client = await clientModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    if (!client) return null;

    return ClientMapper.toDomain(client);
  }
}
