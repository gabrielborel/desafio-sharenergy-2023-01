import { Router } from "express";
import { GetRandomUsersController } from "../../modules/users/use-cases/get-random-users-controller";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";

export const usersRoutes = Router();

const getRandomUsersController = new GetRandomUsersController();

usersRoutes.get("/", ensureAuthenticated, getRandomUsersController.handle);
