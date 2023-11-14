function errorHandler(err, req, res, next) {
  let status = 500;
  let message = `Internal Server Error`;

  if (
    err.name === `SequelizeValidationError` ||
    err.name === `SequelizeUniqueConstraintError`
  ) {
    status = 400;
    message = err.errors[0].message;
    if (message === `Validation len on password failed`) {
      message = `Password must have at least 8 characters`;
    }
    if (message === `Validation isEmail on email failed`) {
      message = `Invalid Email Format`;
    }
  }
  if (err.name === `SequelizeDatabaseError`) {
    status = 400;
    message = `Invalid Data Type`;
  }
  // if (err.name === `file is required`) {
  //   status = 400;
  //   message = `file is required`;
  // }
  if (err.name === `Name is required`) {
    status = 400;
    message = `Name is required`;
  }
  if (err.name === `Email is required`) {
    status = 400;
    message = `Email is required`;
  }
  if (err.name === `Password is required`) {
    status = 400;
    message = `Password is required`;
  }
  if (err.name === `Invalid email/password`) {
    status = 401;
    message = `Invalid email/password`;
  }
  if (err.name === `Invalid token`) {
    status = 401;
    message = `Invalid token`;
  }
  if (err.name === `JsonWebTokenError`) {
    status = 401;
    message = `Invalid token`;
  }
  if (err.name === `You are not authorized`) {
    status = 403;
    message = `You are not authorized`;
  }

  res.status(status).json({
    message,
  });
}

module.exports = errorHandler;
