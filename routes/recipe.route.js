import express from "express";
import asyncHandler from "express-async-handler";

import validateToken from "../middleware/auth.js";
import parseRecipe from "../middleware/parse.js";
import recipeController from "../controllers/recipe.controller.js";

const router = express.Router();

router
  .route("/")
  .get(validateToken, asyncHandler(recipeController.getRecipes))
  .post(
    validateToken,
    parseRecipe,
    asyncHandler(recipeController.createRecipe)
  );

router
  .route("/:recipeId")
  .get(validateToken, asyncHandler(recipeController.getRecipe))
  .delete(validateToken, asyncHandler(recipeController.deleteRecipe))
  .patch(
    validateToken,
    parseRecipe,
    asyncHandler(recipeController.updateRecipe)
  );

export default router;
