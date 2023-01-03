import { Document } from "mongoose";
import { ICreateClientDTO } from "../dtos/create-client-dto";

export interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Document>;
}
