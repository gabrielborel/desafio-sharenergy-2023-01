import express from "express";
import "./database/mongoClient";
import "./shared/containers";
import { routes } from "./shared/routes/index.routes";
import cors from "cors";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
