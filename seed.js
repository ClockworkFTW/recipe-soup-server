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
        { text: "steak" },
        { text: "onions" },
        { text: "cheese" },
        { text: "tortilla" },
      ],
      instructions: [
        { type: "step", index: 0, text: "cook the steak" },
        { type: "step", index: 1, text: "chop the onions" },
        { type: "step", index: 2, text: "melt the cheese" },
        { type: "step", index: 3, text: "build the taco" },
      ],
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
        { text: "pasta" },
        { text: "tomato sauce" },
        { text: "cheese" },
        { text: "basil" },
      ],
      instructions: [
        { type: "step", index: 0, text: "cook the pasta" },
        { type: "step", index: 1, text: "heat the tomato sauce" },
        { type: "step", index: 2, text: "combine the pasta, cheese and basil" },
      ],
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
        { text: "dough" },
        { text: "tomato sauce" },
        { text: "cheese" },
        { text: "pepperoni" },
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
      userId,
    },
    { include: [models.Ingredient, models.Instruction] }
  );
}

export default seed;
