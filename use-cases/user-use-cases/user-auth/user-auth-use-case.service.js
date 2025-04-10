import db from "../../../prisma/index.js";
import CustomError from "../../../utils/CustomError.js";
import {
  hashPassword,
  validatePassword,
} from "../../../lib/bcrypt/bcrypt.lib.js";
import { generateToken } from "../../../lib/jwt/jwt.lib.js";

export const registerNewUser = async ({ email, username, password }) => {
  const existingUser = await db.User.findUnique({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    throw new CustomError("User already exists", 409);
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await db.User.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  return newUser;
};

export const loginUser = async ({ email, username, password }) => {
  const existingUser = await db.User.findUnique({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (!existingUser) {
    throw new CustomError(
      "User with given email or username does not exist",
      404
    );
  }
  const isPasswordValid = await validatePassword(
    password,
    existingUser.password
  );

  if (!isPasswordValid) {
    throw new CustomError("Invalid password", 401);
  }

  const token = await generateToken({ id: existingUser.id });

  return token;
};
