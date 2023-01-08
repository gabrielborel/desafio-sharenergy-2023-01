import { Client } from "../entities/client";

export interface IClientsRepository {
  create(data: Client): Promise<Client>;
  findByEmail(email: string): Promise<Client | null>;
  findByCpf(cpf: string): Promise<Client | null>;
  findAll(): Promise<Client[]>;
  findById(id: string): Promise<Client | null>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<Client>): Promise<Client | null>;
}
