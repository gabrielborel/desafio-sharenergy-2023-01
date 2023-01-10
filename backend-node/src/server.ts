import "reflect-metadata";
import { app } from "./app";
import "./database/mongoClient";

app.listen(3000, () => console.log("Server is running on port 3000."));
