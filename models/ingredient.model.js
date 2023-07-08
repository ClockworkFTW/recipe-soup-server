export default (sequelize, { DataTypes }) => {
  const Ingredient = sequelize.define("ingredient", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Ingredient.associate = (models) => {
    Ingredient.belongsTo(models.Recipe);
  };

  return Ingredient;
};
