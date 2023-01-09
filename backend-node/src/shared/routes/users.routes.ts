import { Router } from "express";
import { GetRandomUsersController } from "../../modules/users/use-cases/get-random-users-controller";

export const usersRoutes = Router();

const getRandomUsersController = new GetRandomUsersController();

usersRoutes.get("/", getRandomUsersController.handle);
