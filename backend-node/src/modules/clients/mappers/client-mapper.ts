import { Client, ClientDocument } from "../entities/client";

export class ClientMapper {
  static toDomain(raw: ClientDocument) {
    return new Client({
      id: raw._id.toString(),
      address: raw.address,
      cellphone: raw.cellphone,
      cpf: raw.cpf,
      email: raw.email,
      name: raw.name,
    });
  }
}
