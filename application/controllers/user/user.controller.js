import asyncHandler from "../../../utils/asyncHandler.js";

export const getMe = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "User fetched successfully",
    data: req.user,
  });
});
