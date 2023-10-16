import moment from "moment";

export default (sequelize, { DataTypes }) => {
  const Recipe = sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cuisine: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.INTEGER,
    },
    cookTime: {
      type: DataTypes.STRING,
    },
    prepTime: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    servings: {
      type: DataTypes.INTEGER,
    },
  });

  Recipe.beforeCreate((recipe) => {
    const prepTime = recipe.prepTime
      ? moment.duration(recipe.prepTime).asSeconds()
      : 0;

    const cookTime = recipe.cookTime
      ? moment.duration(recipe.cookTime).asSeconds()
      : 0;

    recipe.time = prepTime + cookTime;
  });

  Recipe.beforeUpdate((recipe) => {
    const prepTime = recipe.prepTime
      ? moment.duration(recipe.prepTime).asSeconds()
      : 0;

    const cookTime = recipe.cookTime
      ? moment.duration(recipe.cookTime).asSeconds()
      : 0;

    recipe.time = prepTime + cookTime;
  });

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User);
    Recipe.hasOne(models.Image, { onDelete: "cascade", hooks: true });
    Recipe.hasMany(models.Ingredient, { onDelete: "cascade" });
    Recipe.hasMany(models.Instruction, { onDelete: "cascade" });
  };

  return Recipe;
};
