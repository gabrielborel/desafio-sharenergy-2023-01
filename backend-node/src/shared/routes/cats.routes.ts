import { Router } from "express";
import { GetCatImageByStatusCodeController } from "../../modules/cats/use-cases/get-cat-image-by-status-code-controller";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";

export const catsRoutes = Router();

const getCatImageByStatusCodeController =
  new GetCatImageByStatusCodeController();

catsRoutes.get(
  "/:code",
  ensureAuthenticated,
  getCatImageByStatusCodeController.handle
);
