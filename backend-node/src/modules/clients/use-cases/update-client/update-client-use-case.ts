import { inject, injectable } from "tsyringe";
import { IUpdateClientDTO } from "../../dtos/update-client-dto";
import { IClientsRepository } from "../../repositories/clients-repository";

@injectable()
export class UpdateClientUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute(id: string, data: IUpdateClientDTO) {
    return await this.clientsRepository.update(id, data);
  }
}
