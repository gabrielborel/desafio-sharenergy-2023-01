import { Router } from "express";
import { GetRandomDogImageController } from "../../modules/dogs/use-cases/get-random-dog-image-controller";

export const dogsRoutes = Router();

const getRandomDogImageController = new GetRandomDogImageController();

dogsRoutes.get("/", getRandomDogImageController.handle);
