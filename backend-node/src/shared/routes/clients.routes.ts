import Router from "express";
import { CreateClientController } from "../../modules/clients/use-cases/create-client/create-client-controller";

export const clientsRoutes = Router();

const createClientController = new CreateClientController();

clientsRoutes.post("/", createClientController.handle);
