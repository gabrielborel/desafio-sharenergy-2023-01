import { inject, injectable } from "tsyringe";
import { IClientsRepository } from "../../repositories/clients-repository";

@injectable()
export class FindClientByIdUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute(id: string) {
    return await this.clientsRepository.findById(id);
  }
}
