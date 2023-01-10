import express from "express";
import "./shared/containers";
import { routes } from "./shared/routes/index.routes";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
