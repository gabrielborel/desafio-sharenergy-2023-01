import Router from "express";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";
import { authenticateRoutes } from "./authenticate.routes";
import { clientsRoutes } from "./clients.routes";

export const routes = Router();

routes.use("/clients", clientsRoutes);
routes.use("/authenticate", authenticateRoutes);
