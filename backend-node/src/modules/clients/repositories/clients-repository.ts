import { Document } from "mongoose";
import { ICreateClientDTO } from "../dtos/create-client-dto";
import { IUpdateClientDTO } from "../dtos/update-client-dto";

export interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Document>;
  findByEmail(email: string): Promise<Document | null>;
  findByCpf(cpf: string): Promise<Document | null>;
  findAll(): Promise<Document[]>;
  findById(id: string): Promise<Document | null>;
  delete(id: string): Promise<void>;
  update(id: string, data: IUpdateClientDTO): Promise<Document | null>;
}
