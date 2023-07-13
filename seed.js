import models from "./config/postgres.js";

async function seed() {
  const user = await models.User.create({
    username: "Nik Boyle",
    email: "nikolasboyle@gmail.com",
    password: "#Trinity13",
  });

  const userId = user.toJSON().id;

  await models.Recipe.create(
    {
      name: "Tacos",
      prepTime: "PT30M",
      cookTime: "PT15M",
      ingredients: [
        { text: "steak", index: 0 },
        { text: "onions", index: 1 },
        { text: "cheese", index: 2 },
        { text: "tortilla", index: 3 },
      ],
      instructions: [
        { type: "step", index: 0, text: "cook the steak" },
        { type: "step", index: 1, text: "chop the onions" },
        { type: "step", index: 2, text: "melt the cheese" },
        { type: "step", index: 3, text: "build the taco" },
      ],
      cuisine: "Mexican",
      category: "Dinner",
      rating: 4,
      servings: 6,
      userId,
    },
    { include: [models.Ingredient, models.Instruction] }
  );

  await models.Recipe.create(
    {
      name: "Spaghetti",
      prepTime: "PT10M",
      cookTime: "PT10M",
      ingredients: [
        { text: "pasta", index: 0 },
        { text: "tomato sauce", index: 1 },
        { text: "cheese", index: 2 },
        { text: "basil", index: 3 },
      ],
      instructions: [
        { type: "step", index: 0, text: "cook the pasta" },
        { type: "step", index: 1, text: "heat the tomato sauce" },
        { type: "step", index: 2, text: "combine the pasta, cheese and basil" },
      ],
      cuisine: "Italian",
      category: "Dinner",
      rating: 3,
      servings: 4,
      userId,
    },
    { include: [models.Ingredient, models.Instruction] }
  );

  await models.Recipe.create(
    {
      name: "Pizza",
      prepTime: "PT40M",
      cookTime: "PT20M",
      ingredients: [
        { text: "dough", index: 0 },
        { text: "tomato sauce", index: 1 },
        { text: "cheese", index: 2 },
        { text: "pepperoni", index: 3 },
      ],
      instructions: [
        { type: "step", index: 0, text: "form the doug into a circle" },
        {
          type: "step",
          index: 1,
          text: "spread the tomato sauce over the dough",
        },
        { type: "step", index: 2, text: "add cheese and pepperonis to taste" },
        { type: "step", index: 3, text: "bake the pizza for 15 minutes" },
      ],
      cuisine: "Italian",
      category: "Dinner",
      rating: 5,
      servings: 8,
      userId,
    },
    { include: [models.Ingredient, models.Instruction] }
  );
}

export default seed;
