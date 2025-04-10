import CustomError from "../../utils/CustomError.js";

const duplicateKeyException = (error) => {
  const keyValue = error.keyValue;
  const message = `A keyValue pair '${Object.keys(keyValue)} : ${Object.values(
    keyValue
  )}' already exists`;
  return new CustomError(message, 400);
};

export default duplicateKeyException;
