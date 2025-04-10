import {
  registerNewUser,
  loginUser,
} from "../../../use-cases/user-use-cases/user-auth/user-auth-use-case.service.js";

import asyncHandler from "../../../utils/asyncHandler.js";

export const registerUserController = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = await registerNewUser({ username, email, password });
  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: newUser,
  });
});

export const loginUserController = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const loginResponse = await loginUser({ username, email, password });
  res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    data: loginResponse,
  });
});
