import bcrypt from "bcrypt";
import models from "../config/postgres.js";
import variables from "../config/variables.js";
import authService from "../services/auth.service.js";
import mailer from "../config/mailer.js";

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

  const accessToken = authService.generateToken({ type: "access", user });
  const refreshToken = authService.generateToken({ type: "refresh", user });
  const verifyToken = authService.generateToken({ type: "verify", user });

  await mailer.sendVerificationLink({ user, token: verifyToken });

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

  const accessToken = authService.generateToken({ type: "access", user });
  const refreshToken = authService.generateToken({ type: "refresh", user });

  res.cookie("jwt", refreshToken, variables.jwt.refresh.cookieOptions);

  res.send({ accessToken });
}

async function refresh(req, res) {
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken) {
    throw new Error("Unauthorized");
  }

  const payload = authService.verifyToken({
    type: "refresh",
    token: refreshToken,
  });

  const user = await models.User.findByPk(payload.sub);

  if (!user) {
    throw new Error("Invalid token");
  }

  const accessToken = authService.generateToken({ type: "access", user });

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

async function verifyEmail(req, res) {
  const { token } = req.params;

  const payload = authService.verifyToken({ type: "verify", token });

  const user = await models.User.findByPk(payload.sub);

  if (!user) {
    throw new Error("Invalid token");
  }

  await models.User.update({ isVerified: true }, { where: { id: user.id } });

  res.redirect("http://localhost:5173/login");
}

async function forgotPassword(req, res) {
  const { email } = req.body;

  const user = await models.User.findOne({ where: { email } });

  if (!user) {
    return res.send({ message: "password reset link sent" });
  }

  const resetToken = authService.generateToken({ type: "reset", user });

  await mailer.sendResetLink({ user, token: resetToken });

  res.send({ message: "password reset link sent" });
}

async function resetPassword(req, res) {
  const { token } = req.params;
  const { passwordA, passwordB } = req.body;

  const payload = authService.verifyToken({ type: "reset", token });

  const user = await models.User.findByPk(payload.sub);

  if (!user) {
    throw new Error("Invalid token");
  }

  if (passwordA !== passwordB) {
    throw new Error("Passwords do not match");
  }

  const password = await bcrypt.hash(passwordA, 10);

  await models.User.update({ password }, { where: { id: user.id } });

  res.send({ message: "password updated successfully" });
}

export default {
  register,
  login,
  refresh,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
