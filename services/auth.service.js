import jwt from "jsonwebtoken";
import variables from "../config/variables.js";

function generateAccessToken(user) {
  const { secret, duration } = variables.jwt.access;
  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      isVerified: user.isVerified,
      isPremium: user.isPremium,
    },
    secret,
    { expiresIn: duration }
  );
  return token;
}

function generateRefreshToken(user) {
  const { secret, duration } = variables.jwt.refresh;
  const token = jwt.sign(
    {
      userId: user.id,
    },
    secret,
    { expiresIn: duration }
  );
  return token;
}

function verifyAccessToken(token) {
  try {
    const { secret } = variables.jwt.access;
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    throw new Error("Invalid access token");
  }
}

function verifyRefreshToken(token) {
  try {
    const { secret } = variables.jwt.refresh;
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
}

const service = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};

export default service;
