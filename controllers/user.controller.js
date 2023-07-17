import models from "../config/postgres.js";

async function initUser(req, res) {
  const userId = "";

  const user = await models.User.findByPk(userId);

  res.send({ user });
}

export default {
  initUser,
};
