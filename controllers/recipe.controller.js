import models from "../config/postgres.js";

async function getRecipes(req, res) {
  const recipes = await models.Recipe.findAll();
  res.send(recipes);
}

async function getRecipe(req, res) {
  const { recipeId } = req.params;
  const recipe = await models.Recipe.findByPk(recipeId, {
    include: { all: true },
  });
  res.send(recipe);
}

async function createRecipe(req, res) {
  const recipe = await models.Recipe.create(req.body);
  res.send(recipe);
}

async function updateRecipe(req, res) {
  const { recipeId } = req.params;
  const recipe = models.Recipe.findByPk(recipeId);
  await recipe.update(req.body);
  res.send(recipe);
}

async function deleteRecipe(req, res) {
  const { recipeId } = req.params;
  const recipe = models.Recipe.findByPk(recipeId);
  await recipe.destroy();
  res.send(recipeId);
}

export default {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
