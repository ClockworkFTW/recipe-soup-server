export default (sequelize, { DataTypes }) => {
  const Ingredient = sequelize.define("ingredient", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
