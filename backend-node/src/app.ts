import express from "express";
import "./database/mongoClient";
import "./shared/containers";
import { routes } from "./shared/routes/index.routes";

export const app = express();

app.use(express.json());
app.use(routes);
