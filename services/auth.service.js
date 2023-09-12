import jwt from "jsonwebtoken";
import variables from "../config/variables.js";

function generateToken({ type, user }) {
  const { secret, duration } = variables.jwt[type];

  const options = { expiresIn: duration };
  const payload = { sub: user.id, type };

  if (type === "access") {
    payload.isVerified = user.isVerified;
  }

  const token = jwt.sign(payload, secret, options);
  return token;
}

function verifyToken({ type, token }) {
  try {
    const { secret } = variables.jwt[type];

    const payload = jwt.verify(token, secret);

    return payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

const service = {
  generateToken,
  verifyToken,
};

export default service;
