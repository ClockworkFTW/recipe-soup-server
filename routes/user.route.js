import express from "express";

import userController from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(userController.initUser);

export default router;
