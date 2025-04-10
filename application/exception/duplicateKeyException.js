import CustomError from "../../utils/CustomError.js";

const duplicateKeyException = (error) => {
  const target = error.meta?.target?.join(", ") || "field(s)";
  const message = `A record with the same ${target} already exists.`;
  return new CustomError(message, 400);
};

export default duplicateKeyException;
