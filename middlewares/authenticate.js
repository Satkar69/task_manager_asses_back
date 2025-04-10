import CustomError from "../utils/CustomError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { decodeToken } from "../lib/jwt/jwt.js";
import db from "../prisma/index.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // set via client
  }
  if (!token) {
    const error = new CustomError("Authentication token is missing", 401);
    return next(error);
  }

  try {
    const decodedData = decodeToken(token);

    const userId = decodedData.id;

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    if (!user) {
      const error = new CustomError("User not found", 404);
      return next(error);
    }

    req.user = user;

    next();
  } catch (error) {
    const message = "Invalid token";
    console.log(error);
    const err = new CustomError(message, 401);
    return next(err);
  }
});

export default authenticate;
