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
    // Prisma specific error handling
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        error = duplicateKeyException(error); // Unique constraint failed
      }
    }

    // Prisma validation or custom cast errors (e.g., invalid UUID)
    if (
      error instanceof Prisma.PrismaClientValidationError ||
      error instanceof Prisma.PrismaClientInitializationError
    ) {
      error = castException(error);
    }

    // If you throw your own validation error
    if (error.name === "ValidationError") {
      error = validationException(error);
    }

    prodException(res, error);
  }
};

export default globalExceptionHandler;
