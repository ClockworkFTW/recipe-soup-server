import express from "express";
import asyncHandler from "express-async-handler";

import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import parseRecipe from "../middleware/parse.js";
import recipeValidation from "../validations/recipe.validations.js";
import recipeController from "../controllers/recipe.controller.js";

const router = express.Router();

router
  .route("/")
  .get(
    auth,
    validate(recipeValidation.getRecipes),
    asyncHandler(recipeController.getRecipes)
  )
  .post(
    auth,
    parseRecipe,
    validate(recipeValidation.createRecipe),
    asyncHandler(recipeController.createRecipe)
  );

router
  .route("/:recipeId")
  .get(
    auth,
    validate(recipeValidation.getRecipe),
    asyncHandler(recipeController.getRecipe)
  )
  .patch(
    auth,
    parseRecipe,
    validate(recipeValidation.updateRecipe),
    asyncHandler(recipeController.updateRecipe)
  )
  .delete(
    auth,
    validate(recipeValidation.deleteRecipe),
    asyncHandler(recipeController.deleteRecipe)
  );

export default router;
