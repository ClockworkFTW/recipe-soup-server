import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import apiRouter from "../routes/api.route.js";
import errorHandler from "../middleware/error.js";
import variables from "./variables.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(variables.corsOptions));
app.use(cookieParser());

app.use("/api", apiRouter);

app.use(errorHandler);

export default app;
