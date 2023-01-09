import { Router } from "express";
import { GetRandomDogImageController } from "../../modules/dogs/use-cases/get-random-dog-image-controller";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";

export const dogsRoutes = Router();

const getRandomDogImageController = new GetRandomDogImageController();

dogsRoutes.get("/", ensureAuthenticated, getRandomDogImageController.handle);
