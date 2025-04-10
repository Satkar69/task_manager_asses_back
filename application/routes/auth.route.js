import { Router } from "express";

import {
  registerUserController,
  loginUserController,
} from "../controllers/auth/user-auth.controller.js";

const authRouter = Router();

authRouter.route("/register").post(registerUserController);
authRouter.route("/login").post(loginUserController);

export default authRouter;
