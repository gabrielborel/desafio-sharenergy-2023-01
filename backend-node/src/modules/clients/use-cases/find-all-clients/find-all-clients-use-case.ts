import { inject, injectable } from "tsyringe";
import { IClientsRepository } from "../../repositories/clients-repository";

@injectable()
export class FindAllClientsUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute() {
    return await this.clientsRepository.findAll();
  }
}
