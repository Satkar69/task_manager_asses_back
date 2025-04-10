import db from "../../../prisma/index.js";
import CustomError from "../../../utils/CustomError.js";
import { hashPassword, validatePassword } from "../../../lib/bcrypt/bcrypt.js";
import { generateToken } from "../../../lib/jwt/jwt.js";

export const registerNewUser = async ({ username, email, password }) => {
  const existingUser = await db.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existingUser) {
    throw new CustomError("User already exists", 409);
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  delete newUser.password;

  return newUser;
};

export const loginUser = async ({ username, email, password }) => {
  const existingUser = await db.user.findFirst({
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

  const accessToken = await generateToken({ id: existingUser.id });

  delete existingUser.password;

  return { accessToken, user: existingUser };
};
