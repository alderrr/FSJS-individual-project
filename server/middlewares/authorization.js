async function authorization(req, res, next) {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authorization;
