import CustomError from "../../utils/CustomError.js";

const castException = (error) => {
  const message = `Invalid input: ${error.message}`;
  return new CustomError(message, 400);
};

export default castException;
