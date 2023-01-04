import { UpdateClientController } from "./../../modules/clients/use-cases/update-client/update-client-controller";
import Router from "express";
import { CreateClientController } from "../../modules/clients/use-cases/create-client/create-client-controller";
import { DeleteClientController } from "../../modules/clients/use-cases/delete-client/delete-client-controller";
import { FindAllClientsController } from "../../modules/clients/use-cases/find-all-clients/find-all-clients-controller";
import { FindClientByIdController } from "../../modules/clients/use-cases/find-client-by-id/find-client-by-id-controller";
import { createClientSchema } from "../../modules/clients/validators/create-client-schema-validator";
import { validate } from "../middlewares/validate-client-schema-middleware";
import { updateClientSchema } from "../../modules/clients/validators/update-client-schema-validator";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";

export const clientsRoutes = Router();

const createClientController = new CreateClientController();
const findAllClientsController = new FindAllClientsController();
const findClientByIdController = new FindClientByIdController();
const deleteClientController = new DeleteClientController();
const updateClientController = new UpdateClientController();

clientsRoutes.post(
  "/",
  ensureAuthenticated,
  validate(createClientSchema),
  createClientController.handle
);

clientsRoutes.get("/", ensureAuthenticated, findAllClientsController.handle);

clientsRoutes.get("/:id", ensureAuthenticated, findClientByIdController.handle);

clientsRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteClientController.handle
);

clientsRoutes.put(
  "/:id",
  ensureAuthenticated,
  validate(updateClientSchema),
  updateClientController.handle
);
