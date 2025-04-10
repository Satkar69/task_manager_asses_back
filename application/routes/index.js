import { Router } from "express";
import authenticate from "../../middlewares/authenticate.js";
import userAuthRouter from "./auth/user-auth.route.js";
import userRouter from "./user/user.route.js";
import userTaskRouter from "./user/user-task/user-task.route.js";

const appRouter = Router();

const globalPrefix = "/api/task-manager";

appRouter.use(globalPrefix, userAuthRouter);

// authenticated routes
appRouter.use(authenticate);

appRouter.use(globalPrefix, userRouter);
appRouter.use(globalPrefix, userTaskRouter);

export default appRouter;
