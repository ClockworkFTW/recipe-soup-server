import express from "express";
import asyncHandler from "express-async-handler";

import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import userValidation from "../validations/user.validations.js";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router
  .route("/:userId")
  .get(
    auth,
    validate(userValidation.getUser),
    asyncHandler(userController.getUser)
  )
  .patch(
    auth,
    validate(userValidation.updateUser),
    asyncHandler(userController.updateUser)
  )
  .delete(
    auth,
    validate(userValidation.deleteUser),
    asyncHandler(userController.deleteUser)
  );

export default router;
