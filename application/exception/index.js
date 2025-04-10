import castException from "./castException.js";
import duplicateKeyException from "./duplicateKeyException.js";
import validationException from "./validationException.js";
import devException from "./environment/devException.js";
import prodException from "./environment/prodException.js";

const globalExceptionHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  console.log("Entering globalErrorHandler");
  console.log("Environment:", process.env.NODE_ENV);
  console.log("Error:", error);

  if (process.env.NODE_ENV === "development") {
    devException(res, error);
  } else if (process.env.NODE_ENV === "production") {
    /**
     * here, error has name property-->invalid_ID/CastError is thrown/caught by mongoose
     */
    if (error.name === "CastError") error = castException(error);
    /**
     * here, error has no name property-->duplicatekeyError is thrown/caught by mongodb driver so we identify using error code
     */
    if (error.code === 11000) error = duplicateKeyException(error);
    if (error.name === "ValidationError") error = validationException(error);
    prodException(res, error);
  }
};
export default globalExceptionHandler;
