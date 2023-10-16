import { deleteFile } from "../config/aws.js";

export default (sequelize, { DataTypes }) => {
  const Image = sequelize.define("image", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bucket: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Image.afterDestroy(async ({ bucket, key }) => {
    await deleteFile({ bucket, key });
  });

  Image.associate = (models) => {
    Image.belongsTo(models.Recipe, { hooks: true });
  };

  return Image;
};
