import express from "express";
import fighterRouter from "./routes/fighterRoutes.js";
import predictionRouter from "./routes/predictionRoutes.js";

const app = express();

app.use(express.json());

app.use("/app/v1/fighters", fighterRouter);
app.use("/app/v1/prediction", predictionRouter);

export default app;
