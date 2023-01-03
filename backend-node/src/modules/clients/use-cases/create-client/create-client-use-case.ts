import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateClientDTO } from "../../dtos/create-client-dto";
import { IClientsRepository } from "../../repositories/clients-repository";

@injectable()
export class CreateClientUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute(data: ICreateClientDTO) {
    const emailAlreadyExists = await this.clientsRepository.findByEmail(
      data.email
    );

    if (emailAlreadyExists) {
      throw new AppError(400, "Email já está em uso.");
    }

    const cpfAlreadyExists = await this.clientsRepository.findByCpf(data.cpf);

    if (cpfAlreadyExists) {
      throw new AppError(400, "CPF já está em uso.");
    }

    return await this.clientsRepository.create(data);
  }
}
