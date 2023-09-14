import models from "../config/postgres.js";
import { uploadFile } from "../config/aws.js";

async function getRecipes(req, res) {
  const recipes = await models.Recipe.findAll({
    where: { userId: req.userId },
  });

  const test = await Promise.all(
    recipes.map(async (recipe) => {
      const { url } = await models.Image.findOne({
        where: { recipeId: recipe.id },
      });
      return { ...recipe.toJSON(), image: url };
    })
  );

  res.send(test);
}

async function getRecipe(req, res) {
  const { recipeId } = req.params;

  const recipe = await models.Recipe.findByPk(recipeId, {
    include: [models.Ingredient, models.Instruction],
    order: [
      [models.Ingredient, "index", "ASC"],
      [models.Instruction, "index", "ASC"],
    ],
  });

  if (!recipe || recipe.userId !== req.userId) {
    throw new Error("Recipe could not be found");
  }

  const { url } = await models.Image.findOne({ where: { recipeId } });

  res.send({ ...recipe.toJSON(), image: url });
}

async function createRecipe(req, res) {
  const recipe = await models.Recipe.create({
    ...req.body,
    userId: req.userId,
  });

  const recipeId = recipe.id;

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

  // Create image
  const imageData = await uploadFile(req.image);
  await models.Image.create({ ...imageData, recipeId });

  res.send({ id: recipeId });
}

async function updateRecipe(req, res) {
  const { recipeId } = req.params;

  const recipe = models.Recipe.findByPk(recipeId);

  if (!recipe || recipe.userId !== req.userId) {
    throw new Error("Recipe could not be updated");
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

  // Create image
  if (req.image) {
    const imageData = await uploadFile(req.image);
    await models.Image.destroy({ where: { recipeId }, individualHooks: true });
    await models.Image.create({ ...imageData, recipeId });
  }

  res.send({ id: recipeId });
}

async function deleteRecipe(req, res) {
  const { recipeId } = req.params;

  const recipe = await models.Recipe.findByPk(recipeId);

  if (!recipe || recipe.userId !== req.userId) {
    throw new Error("Recipe could not be deleted");
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
