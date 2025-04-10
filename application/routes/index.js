import { Router } from "express";
import authRouter from "./auth.route.js";

const appRouter = Router();

const globalPrefix = "/api/task-manager";

// auth
appRouter.use(`${globalPrefix}/auth/user`, authRouter);

export default appRouter;
