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
    description: {
      type: DataTypes.STRING,
    },
    cuisine: {
      type: DataTypes.STRING,
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

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User);
    Recipe.hasOne(models.Image, { onDelete: "cascade", hooks: true });
    Recipe.hasMany(models.Ingredient, { onDelete: "cascade" });
    Recipe.hasMany(models.Instruction, { onDelete: "cascade" });
  };

  return Recipe;
};
