import models from "./config/postgres.js";

async function seed() {
  const user = await models.User.create({
    username: "Nik Boyle",
    email: "nikolasboyle@gmail.com",
    password: "$2b$10$5DB3xu81xHFWiiYnt5AK7uX6ZwwmwNhUTKoC9lzNhLPE4eoeleo6S",
  });

  const userId = user.toJSON().id;

  await models.Recipe.create(
    {
      name: "Tacos",
      prepTime: "PT30M",
      cookTime: "PT15M",
      image: {
        bucket: "jnb-recipe-book-bucket",
        key: "image/3ff598dc-743d-4749-b305-9f618a1cd2bb.jpg",
        url: "https://jnb-recipe-book-bucket.s3.us-west-1.amazonaws.com/image/3ff598dc-743d-4749-b305-9f618a1cd2bb.jpg",
      },
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
    { include: [models.Image, models.Ingredient, models.Instruction] }
  );

  await models.Recipe.create(
    {
      name: "Spaghetti",
      prepTime: "PT10M",
      cookTime: "PT10M",
      image: {
        bucket: "jnb-recipe-book-bucket",
        key: "image/2c88943c-2acd-49a2-abe1-075c9e5495a9.jpg",
        url: "https://jnb-recipe-book-bucket.s3.us-west-1.amazonaws.com/image/2c88943c-2acd-49a2-abe1-075c9e5495a9.jpg",
      },
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
    { include: [models.Image, models.Ingredient, models.Instruction] }
  );

  await models.Recipe.create(
    {
      name: "Pizza",
      prepTime: "PT40M",
      cookTime: "PT20M",
      image: {
        bucket: "jnb-recipe-book-bucket",
        key: "image/634701bc-0ff9-4bfa-a74c-3be007161ce3.jpg",
        url: "https://jnb-recipe-book-bucket.s3.us-west-1.amazonaws.com/image/634701bc-0ff9-4bfa-a74c-3be007161ce3.jpg",
      },
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
    { include: [models.Image, models.Ingredient, models.Instruction] }
  );
}

export default seed;
