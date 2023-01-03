import Router from "express";
import { CreateClientController } from "../../modules/clients/use-cases/create-client/create-client-controller";
import { createClientSchema } from "../../modules/clients/validators/create-client-schema-validator";
import { validate } from "../middlewares/validate-client-schema-middleware";

export const clientsRoutes = Router();

const createClientController = new CreateClientController();

clientsRoutes.post(
  "/",
  validate(createClientSchema),
  createClientController.handle
);
