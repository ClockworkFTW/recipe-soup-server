import models from "../config/postgres.js";
import variables from "../config/variables.js";

async function getUser(req, res) {
  const { userId } = req.params;

  const user = await models.User.findByPk(userId, {
    attributes: ["username", "email", "isVerified", "createdAt"],
  });

  if (!user) {
    throw new Error("User not found");
  }

  const recipeCount = await models.Recipe.count({ where: { userId } });

  res.send({ ...user.toJSON(), recipeCount });
}

async function updateUser(req, res) {
  const { userId } = req.params;

  const user = await models.User.findByPk(userId);

  if (!user) {
    throw new Error("User not found");
  }

  await models.User.update(req.body, { where: { id: userId } });

  res.send({ id: userId });
}

async function deleteUser(req, res) {
  const { userId } = req.params;

  const user = await models.User.findByPk(userId);

  if (!user) {
    throw new Error("User not found");
  }

  await user.destroy();

  res.clearCookie("jwt", variables.jwt.refresh.cookieOptions);

  res.send({ message: "Account deleted successfully" });
}

export default {
  getUser,
  updateUser,
  deleteUser,
};
