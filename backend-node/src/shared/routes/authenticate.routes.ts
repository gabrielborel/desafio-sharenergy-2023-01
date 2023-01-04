import { Router } from "express";
import { AuthenticateController } from "../../modules/authentication/use-cases/authenticate/authenticate-controller";

export const authenticateRoutes = Router();

const authenticateController = new AuthenticateController();

authenticateRoutes.post("/", authenticateController.handle);
