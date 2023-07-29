import express from "express";
import asyncHandler from "express-async-handler";

import upload from "../middleware/upload.js";
import recipeController from "../controllers/recipe.controller.js";

const router = express.Router();

router
  .route("/")
  .get(asyncHandler(recipeController.getRecipes))
  .post(upload, asyncHandler(recipeController.createRecipe));

router
  .route("/:recipeId")
  .get(asyncHandler(recipeController.getRecipe))
  .patch(upload, asyncHandler(recipeController.updateRecipe))
  .delete(asyncHandler(recipeController.deleteRecipe));

export default router;
