const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    let access_token = req.headers.authorization;
    if (!access_token) {
      throw {
        name: `Invalid token`,
      };
    }
    access_token = access_token.split(" ")[1];
    const decoded = verifyToken(access_token);
    const foundUser = await User.findOne({
      where: {
        email: decoded.email,
      },
    });
    if (!foundUser) {
      throw {
        name: `Invalid token`,
      };
    }
    req.user = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authentication;
