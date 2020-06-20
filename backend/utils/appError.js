class AppError extends Error {
  constructor(message, statusCode) {
    // Error takes message as an arg which Error have natively
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // This line will help to prevent this class to showup in stacktrace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;