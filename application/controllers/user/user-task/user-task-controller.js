import {
  getAllTasks,
  getTask,
  addNewTask,
  updateTask,
  deleteTask,
} from "../../../../use-cases/user-use-cases/user-task/user-task-use-case.service.js";

import asyncHandler from "../../../../utils/asyncHandler.js";

export const getAllTasksController = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const tasks = await getAllTasks(userId);
  res.status(200).json({
    status: "success",
    message: "Tasks fetched successfully",
    data: tasks,
  });
});

export const getTaskController = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;
  const task = await getTask(taskId);
  res.status(200).json({
    status: "success",
    message: "Task fetched successfully",
    data: task,
  });
});

export const addNewTaskController = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { title, description } = req.body;
  const newTask = await addNewTask({ title, description, userId });
  res.status(201).json({
    status: "success",
    message: "Task added successfully",
    data: newTask,
  });
});

export const updateTaskController = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;
  const taskData = req.body;
  const updatedTask = await updateTask(taskId, taskData);
  res.status(200).json({
    status: "success",
    message: "Task updated successfully",
    data: updatedTask,
  });
});

export const deleteTaskController = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;
  await deleteTask(taskId);
  res.status(200).json({
    status: "success",
    message: "Task deleted successfully",
    data: null,
  });
});
