const notFound = (req, res, next) => {
  // Error on url requested
  const error = new Error(`Not Found - ${req.orginalUrl}`);
  res.status(404);
  // Calls next piece of middleware
  next(error);
}

const errorHandler = (err, req, res, next) => {
  // Check to see if status code on manual error is 200
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check for cast error
  if(err.name === "CastError" && err.kind === "ObjectId") {
      statusCode = 404;
      message = "Resource not found";
  }

  res.status(statusCode).json({
      message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
}

export { notFound, errorHandler };