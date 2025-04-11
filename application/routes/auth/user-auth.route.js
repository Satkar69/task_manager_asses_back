import { Router } from "express";

import {
  registerUserController,
  loginUserController,
} from "../../controllers/auth/user-auth.controller.js";

const userAuthRouter = Router();

const prefix = "/auth/user";

userAuthRouter.route(`${prefix}/register`).post(registerUserController);
userAuthRouter.route(`${prefix}/login`).post(loginUserController);

export default userAuthRouter;
