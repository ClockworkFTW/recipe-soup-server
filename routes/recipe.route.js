import express from "express";

import recipeController from "../controllers/recipe.controller.js";

const router = express.Router();

router
  .route("/")
  .get(recipeController.getRecipes)
  .post(recipeController.createRecipe);

router
  .route("/:recipeId")
  .get(recipeController.getRecipe)
  .patch(recipeController.updateRecipe)
  .delete(recipeController.deleteRecipe);

export default router;
