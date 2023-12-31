import authService from "../services/auth.service.js";

function validateToken(req, res, next) {
  try {
    const token =
      req.headers.authorization?.startsWith("Bearer ") &&
      req.headers.authorization.substring(7, req.headers.authorization.length);

    const decoded = authService.verifyToken({ type: "access", token });
    req.auth = { userId: decoded.sub };

    next();
  } catch (error) {
    return res.status(403).send({ message: "Invalid token" });
  }
}

export default validateToken;
