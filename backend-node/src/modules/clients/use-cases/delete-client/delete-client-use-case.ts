import { inject, injectable } from "tsyringe";
import { IClientsRepository } from "../../repositories/clients-repository";

@injectable()
export class DeleteClientUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute(id: string) {
    await this.clientsRepository.delete(id);
  }
}
