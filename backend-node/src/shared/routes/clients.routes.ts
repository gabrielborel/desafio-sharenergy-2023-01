import Router from "express";
import { CreateClientController } from "../../modules/clients/use-cases/create-client/create-client-controller";
import { DeleteClientController } from "../../modules/clients/use-cases/delete-client/delete-client-controller";
import { FindAllClientsController } from "../../modules/clients/use-cases/find-all-clients/find-all-clients-controller";
import { FindClientByIdController } from "../../modules/clients/use-cases/find-client-by-id/find-client-by-id-controller";
import { createClientSchema } from "../../modules/clients/validators/create-client-schema-validator";
import { validate } from "../middlewares/validate-client-schema-middleware";

export const clientsRoutes = Router();

const createClientController = new CreateClientController();
const findAllClientsController = new FindAllClientsController();
const findClientByIdController = new FindClientByIdController();
const deleteClientController = new DeleteClientController();

clientsRoutes.post(
  "/",
  validate(createClientSchema),
  createClientController.handle
);

clientsRoutes.get("/", findAllClientsController.handle);

clientsRoutes.get("/:id", findClientByIdController.handle);

clientsRoutes.delete("/:id", deleteClientController.handle);
