import express from "express";

import authRouter from "./auth.route.js";
import recipeRouter from "./recipe.route.js";

const router = express.Router();

router.get("/status", (req, res) => res.send("OK"));

router.use("/auth", authRouter);
router.use("/recipe", recipeRouter);

export default router;
