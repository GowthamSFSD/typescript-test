// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ValidationError, UniqueConstraintError } from "sequelize";

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("🔥 Global Error:", err.message);

  //  Sequelize Validation Error (e.g., null/invalid field)
  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      type: "SequelizeValidationError",
      message: "Validation Error",
      errors: err.errors.map((e) => e.message),
    });
  }

  //  Sequelize Unique Constraint Error (e.g., duplicate email)
  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({
      success: false,
      type: "SequelizeUniqueError",
      message: "Duplicate value error",
      errors: err.errors.map((e) => e.message),
    });
  }

  //  Invalid JSON Body (like malformed JSON from frontend)
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      success: false,
      type: "SyntaxError",
      message: "Invalid JSON payload",
    });
  }

  //  Custom AppError (manual errors thrown in services/controllers)
  if (err.name === "AppError") {
    return res.status(err.statusCode || 500).json({
      success: false,
      type: "AppError",
      message: err.message,
    });
  }

  //  Catch-All (anything else)
  res.status(err.statusCode || 500).json({
    success: false,
    type: "UnknownError",
    message: err.message || "Something went wrong 💥",
  });
};
