import express from "express";

import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import recipeRoute from "./recipe.route.js";

const router = express.Router();

router.get("/status", (req, res) => res.send("OK"));

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/recipe", recipeRoute);

export default router;
