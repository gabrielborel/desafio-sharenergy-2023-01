import Router from "express";
import { clientsRoutes } from "./clients.routes";

export const routes = Router();

routes.use("/clients", clientsRoutes);
