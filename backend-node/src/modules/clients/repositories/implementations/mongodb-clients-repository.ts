import { clientModel } from "./../../schemas/client";
import { ICreateClientDTO } from "../../dtos/create-client-dto";
import { IClientsRepository } from "../clients-repository";
import { Document } from "mongoose";

export class MongodbClientsRepository implements IClientsRepository {
  async create(data: ICreateClientDTO): Promise<Document> {
    return await clientModel.create(data);
  }
}
