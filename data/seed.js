import { v4 as uuidv4 } from "uuid";
import models from "../config/postgres.js";
import recipes from "./recipes.json" assert { type: "json" };

async function seed() {
  const userId = uuidv4();

  await models.User.create({
    id: userId,
    email: "test@email.com",
    password: "$2b$10$FGVk6x/sZ2Fe99SEu3nF6uYJDovlxWHAAjOLiE0HUU4O/3B/OJwLC",
  });

  await Promise.all(
    recipes.data.map(
      async (recipe) =>
        await models.Recipe.create(
          { ...recipe, userId },
          { include: [models.Image, models.Ingredient, models.Instruction] }
        )
    )
  );
}

export default seed;
