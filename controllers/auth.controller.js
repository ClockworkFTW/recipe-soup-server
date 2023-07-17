import bcrypt from "bcrypt";
import models from "../config/postgres.js";
import variables from "../config/variables.js";
import authService from "../services/auth.service.js";

async function register(req, res) {
  const { username, email, passwordA, passwordB } = req.body;

  if (passwordA !== passwordB) {
    throw new Error("Passwords do not match");
  }

  const existingUser = await models.User.findOne({ where: { email } });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  const password = await bcrypt.hash(passwordA, 10);

  const user = await models.User.create({ username, email, password });

  const accessToken = authService.generateAccessToken(user);
  const refreshToken = authService.generateRefreshToken(user);

  res.cookie("jwt", refreshToken, variables.jwt.refresh.cookieOptions);

  res.send({ accessToken });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await models.User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Email or password incorrect");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Email or password incorrect");
  }

  const accessToken = authService.generateAccessToken(user);
  const refreshToken = authService.generateRefreshToken(user);

  res.cookie("jwt", refreshToken, variables.jwt.refresh.cookieOptions);

  res.send({ accessToken });
}

async function refresh(req, res) {
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken) {
    throw new Error("Unauthorized");
  }

  const { userId } = authService.verifyRefreshToken(refreshToken);

  const user = await models.User.findByPk(userId);

  if (!user) {
    throw new Error("Unauthorized");
  }

  const accessToken = authService.generateAccessToken(user);

  res.send({ accessToken });
}

async function logout(req, res) {
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken) {
    throw new Error("Unable to logout");
  }

  res.clearCookie("jwt", variables.jwt.refresh.cookieOptions);

  res.send({ message: "logout successful" });
}

export default {
  register,
  login,
  refresh,
  logout,
};
