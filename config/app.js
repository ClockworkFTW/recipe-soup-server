import express from "express";
import cors from "cors";

import apiRouter from "../routes/api.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", apiRouter);

export default app;
