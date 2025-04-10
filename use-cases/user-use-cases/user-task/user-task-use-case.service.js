import db from "../../../prisma/index.js";
import CustomError from "../../../utils/CustomError.js";

export const addNewTask = async ({ title, description, userId }) => {
  const newTask = await db.task.create({
    data: {
      title,
      description,
      userId,
    },
  });

  return newTask;
};

export const getAllTasks = async (userId) => {
  const tasks = await db.task.findMany({
    where: {
      userId,
    },
  });
  return tasks;
};

export const getTask = async (taskId) => {
  const task = await db.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!task) {
    throw new CustomError("Task not found", 404);
  }

  return task;
};

export const updateTask = async (taskId, taskData) => {
  const updatedTask = await db.task.update({
    where: {
      id: taskId,
    },
    data: taskData,
  });

  return updatedTask;
};

export const deleteTask = async (taskId) => {
  const task = await db.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!task) {
    throw new CustomError("Task not found", 404);
  }

  return await db.task.delete({
    where: {
      id: task.id,
    },
  });
};
