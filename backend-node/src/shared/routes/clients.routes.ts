import Router from "express";
import { CreateClientController } from "../../modules/clients/use-cases/create-client/create-client-controller";
import { clientSchema } from "../../modules/clients/validators/client-schema-validator";
import { validate } from "../middlewares/validate-client-schema-middleware";

export const clientsRoutes = Router();

const createClientController = new CreateClientController();

clientsRoutes.post("/", validate(clientSchema), createClientController.handle);
