import Router from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { catsRoutes } from "./cats.routes";
import { clientsRoutes } from "./clients.routes";
import { dogsRoutes } from "./dogs.routes";

export const routes = Router();

routes.use("/clients", clientsRoutes);
routes.use("/authenticate", authenticateRoutes);
routes.use("/cats", catsRoutes);
routes.use("/dogs", dogsRoutes);
