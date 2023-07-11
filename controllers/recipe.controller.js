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

  // Strip client ID's and assign recipe ID
  const ingredients = req.body.ingredients.map(({ id, ...ingredient }) => ({
    ...ingredient,
    recipeId: recipe.id,
  }));
  const instructions = req.body.instructions.map(({ id, ...instruction }) => ({
    ...instruction,
    recipeId: recipe.id,
  }));

  // Create new ingredients and instructions
  await models.Ingredient.bulkCreate(ingredients);
  await models.Instruction.bulkCreate(instructions);

  res.send({ id: recipe.id });
}

async function updateRecipe(req, res) {
  const { recipeId } = req.params;

  const recipe = models.Recipe.findByPk(recipeId);

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  await models.Recipe.update(req.body, { where: { id: recipeId } });

  // Delete old ingredients and instructions
  await models.Ingredient.destroy({ where: { recipeId } });
  await models.Instruction.destroy({ where: { recipeId } });

  // Strip client ID's and assign recipe ID
  const ingredients = req.body.ingredients.map(({ id, ...ingredient }) => ({
    ...ingredient,
    recipeId,
  }));
  const instructions = req.body.instructions.map(({ id, ...instruction }) => ({
    ...instruction,
    recipeId,
  }));

  // Create new ingredients and instructions
  await models.Ingredient.bulkCreate(ingredients);
  await models.Instruction.bulkCreate(instructions);

  res.send({ id: recipeId });
}

async function deleteRecipe(req, res) {
  const { recipeId } = req.params;

  const recipe = await models.Recipe.findByPk(recipeId);

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  await recipe.destroy();

  res.send({ id: recipeId });
}

export default {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
