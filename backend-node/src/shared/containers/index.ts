import { container } from "tsyringe";
import { IClientsRepository } from "../../modules/clients/repositories/clients-repository";
import { MongodbClientsRepository } from "../../modules/clients/repositories/implementations/mongodb-clients-repository";

container.registerSingleton<IClientsRepository>(
  "ClientsRepository",
  MongodbClientsRepository
);
