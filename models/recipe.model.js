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
    notes: {
      type: DataTypes.STRING,
    },
    cookTime: {
      type: DataTypes.STRING,
    },
    prepTime: {
      type: DataTypes.STRING,
    },
  });

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User);
    Recipe.hasOne(models.Image);
    Recipe.hasMany(models.Ingredient);
    Recipe.hasMany(models.Instruction);
  };

  return Recipe;
};
