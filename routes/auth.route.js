import express from "express";
import asyncHandler from "express-async-handler";

import validate from "../middleware/validate.js";
import authValidation from "../validations/auth.validations.js";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post(
  "/register",
  validate(authValidation.register),
  asyncHandler(authController.register)
);
router.post(
  "/login",
  validate(authValidation.login),
  asyncHandler(authController.login)
);
router.post("/refresh", asyncHandler(authController.refresh));
router.post("/logout", asyncHandler(authController.logout));

router.get(
  "/verify-email/:token",
  validate(authValidation.verifyEmail),
  asyncHandler(authController.verifyEmail)
);

router.post(
  "/forgot-password",
  validate(authValidation.forgotPassword),
  asyncHandler(authController.forgotPassword)
);
router.post(
  "/reset-password/:token",
  validate(authValidation.resetPassword),
  asyncHandler(authController.resetPassword)
);

export default router;
