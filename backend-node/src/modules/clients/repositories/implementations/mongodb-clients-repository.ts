import { clientModel } from "./../../schemas/client";
import { ICreateClientDTO } from "../../dtos/create-client-dto";
import { IClientsRepository } from "../clients-repository";
import { Document } from "mongoose";
import { IUpdateClientDTO } from "../../dtos/update-client-dto";

export class MongodbClientsRepository implements IClientsRepository {
  async create(data: ICreateClientDTO): Promise<Document> {
    return await clientModel.create(data);
  }

  async findByEmail(email: string): Promise<Document | null> {
    return await clientModel.findOne({ email });
  }

  async findByCpf(cpf: string): Promise<Document | null> {
    return await clientModel.findOne({ cpf });
  }

  async findAll() {
    return await clientModel.find();
  }

  async findById(id: string): Promise<Document | null> {
    return await clientModel.findById(id);
  }

  async delete(id: string): Promise<void> {
    await clientModel.findByIdAndDelete(id);
  }

  async update(id: string, data: IUpdateClientDTO): Promise<Document | null> {
    return await clientModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
  }
}
