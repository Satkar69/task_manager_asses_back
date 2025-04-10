import CustomError from "../../utils/CustomError.js";

const validationException = (error) => {
  const message = `Invalid input: ${error.message}`;
  return new CustomError(message, 400);
};

export default validationException;
