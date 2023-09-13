import Sequelize from "sequelize";
import variables from "./variables.js";

import userModel from "../models/user.model.js";
import recipeModel from "../models/recipe.model.js";
import imageModel from "../models/image.model.js";
import ingredientModel from "../models/ingredient.model.js";
import instructionModel from "../models/instruction.model.js";

const sequelize = new Sequelize(
  variables.postgres.database,
  variables.postgres.user,
  variables.postgres.password,
  {
    host: variables.postgres.host,
    port: variables.postgres.port,
    dialectOptions: variables.postgres.dialectOptions,
    dialect: "postgres",
    logging: false,
  }
);

const models = {
  User: userModel(sequelize, Sequelize),
  Recipe: recipeModel(sequelize, Sequelize),
  Image: imageModel(sequelize, Sequelize),
  Ingredient: ingredientModel(sequelize, Sequelize),
  Instruction: instructionModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
