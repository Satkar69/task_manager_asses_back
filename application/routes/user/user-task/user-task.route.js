import { Router } from "express";

import {
  getAllTasksController,
  getTaskController,
  addNewTaskController,
  updateTaskController,
  deleteTaskController,
} from "../../../controllers/user/user-task/user-task-controller.js";

const userTaskRouter = Router();

const prefix = "/user/task";

userTaskRouter.route(`${prefix}/add`).post(addNewTaskController);
userTaskRouter.route(`${prefix}/get/:id`).get(getTaskController);
userTaskRouter.route(`${prefix}/get-all`).get(getAllTasksController);
userTaskRouter.route(`${prefix}/update/:id`).patch(updateTaskController);
userTaskRouter.route(`${prefix}/delete/:id`).delete(deleteTaskController);

export default userTaskRouter;
