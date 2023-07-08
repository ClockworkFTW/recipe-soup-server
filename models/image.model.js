export default (sequelize, { DataTypes }) => {
  const Image = sequelize.define("image", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Image.associate = (models) => {
    Image.belongsTo(models.Recipe);
  };

  return Image;
};
