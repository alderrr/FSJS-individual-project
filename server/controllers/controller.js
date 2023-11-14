const { User } = require("../models");
const { comparePassword } = require("../helpers/bcryptjs");
const { signToken, verifyToken } = require("../helpers/jwt");
const { Op } = require("sequelize");
// const imagekit = require("../api/imagekit"); // kalau mau pakai ini jangan lupa npm install

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const payload = { username, email, password };
      const newUser = await User.create(payload);
      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw {
          name: `Email is required`,
        };
      }
      if (!password) {
        throw {
          name: `Password is required`,
        };
      }
      const user
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
