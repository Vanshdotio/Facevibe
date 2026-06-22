/**
 * Global Error Handling Middleware.
 * Standardizes API error responses.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  console.error(`[Error Handler] ${err.stack}`);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong.",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
