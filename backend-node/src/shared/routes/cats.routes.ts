import { Router } from "express";
import { GetCatImageByStatusCodeController } from "../../modules/cats/use-cases/get-cat-image-by-status-code-controller";

export const catsRoutes = Router();

const getCatImageByStatusCodeController =
  new GetCatImageByStatusCodeController();

catsRoutes.get("/:code", getCatImageByStatusCodeController.handle);
