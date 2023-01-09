import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateClientDTO } from "../../dtos/create-client-dto";
import { Client } from "../../entities/client";
import { IClientsRepository } from "../../repositories/clients-repository";

@injectable()
export class CreateClientUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute(data: ICreateClientDTO) {
    const { address, cellphone, cpf, email, name } = data;

    const emailAlreadyExists = await this.clientsRepository.findByEmail(email);
    if (emailAlreadyExists) {
      throw new AppError(400, "Email já está em uso.");
    }

    const cpfAlreadyExists = await this.clientsRepository.findByCpf(cpf);
    if (cpfAlreadyExists) {
      throw new AppError(400, "CPF já está em uso.");
    }

    const client = new Client({ address, cellphone, cpf, email, name });

    return await this.clientsRepository.create(client);
  }
}
