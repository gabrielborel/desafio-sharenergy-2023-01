import { inject, injectable } from "tsyringe";
import { ICreateClientDTO } from "../../dtos/create-client-dto";
import { IClientsRepository } from "../../repositories/clients-repository";

@injectable()
export class CreateClientUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute(data: ICreateClientDTO) {
    return await this.clientsRepository.create(data);
  }
}
