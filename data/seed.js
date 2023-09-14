import { v4 as uuidv4 } from "uuid";
import models from "../config/postgres.js";
import recipes from "./recipes.json" assert { type: "json" };

async function seed() {
  const userId = uuidv4();

  await models.User.create({
    id: userId,
    username: "Demo",
    email: "demo@recipesoup.app",
    password: "$2b$10$vThI1E7jeGEX6DuBqqtGGuSCoFSCyHgC5QYZqtttm6RoY2OewbgdS",
    isVerified: true,
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
