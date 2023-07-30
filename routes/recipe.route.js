import express from "express";
import asyncHandler from "express-async-handler";

import parseRecipe from "../middleware/parse.js";
import recipeController from "../controllers/recipe.controller.js";

const router = express.Router();

router
  .route("/")
  .get(asyncHandler(recipeController.getRecipes))
  .post(parseRecipe, asyncHandler(recipeController.createRecipe));

router
  .route("/:recipeId")
  .get(asyncHandler(recipeController.getRecipe))
  .patch(parseRecipe, asyncHandler(recipeController.updateRecipe))
  .delete(asyncHandler(recipeController.deleteRecipe));

export default router;
