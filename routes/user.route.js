import express from "express";
import asyncHandler from "express-async-handler";

import userController from "../controllers/user.controller.js";

const router = express.Router();

router
  .route("/:userId")
  .get(asyncHandler(userController.getUser))
  .patch(asyncHandler(userController.updateUser))
  .delete(asyncHandler(userController.deleteUser));

export default router;
