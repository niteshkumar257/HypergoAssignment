export const ErrorHandler=(error, req, res, next) => {
    error.statusCode = error.statuscode || 500;
    error.status = "fail";
  
    res.status(error.statusCode).json({
      message: error.message,
      status: error.status,
    })
}
