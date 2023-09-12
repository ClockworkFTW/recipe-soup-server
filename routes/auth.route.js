import express from "express";
import asyncHandler from "express-async-handler";

import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
router.post("/refresh", asyncHandler(authController.refresh));
router.post("/logout", asyncHandler(authController.logout));

router.get("/verify-email/:token", asyncHandler(authController.verifyEmail));

router.post("/forgot-password", asyncHandler(authController.forgotPassword));
router.post(
  "/reset-password/:token",
  asyncHandler(authController.resetPassword)
);

export default router;
