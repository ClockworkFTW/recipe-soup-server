import express from "express";
import asyncHandler from "express-async-handler";

import validateToken from "../middleware/auth.js";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router
  .route("/:userId")
  .get(validateToken, asyncHandler(userController.getUser))
  .patch(validateToken, asyncHandler(userController.updateUser))
  .delete(validateToken, asyncHandler(userController.deleteUser));

export default router;
