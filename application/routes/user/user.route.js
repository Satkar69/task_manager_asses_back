import { Router } from "express";

import { getMe } from "../../controllers/user/user.controller.js";

const userRouter = Router();

const prefix = "/user";

userRouter.route(`${prefix}/get-me`).get(getMe);

export default userRouter;
