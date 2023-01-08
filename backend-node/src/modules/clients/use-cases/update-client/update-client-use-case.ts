import { inject, injectable } from "tsyringe";
import { Client } from "../../entities/client";
import { IClientsRepository } from "../../repositories/clients-repository";

@injectable()
export class UpdateClientUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute(id: string, data: Partial<Client>) {
    return await this.clientsRepository.update(id, data);
  }
}
