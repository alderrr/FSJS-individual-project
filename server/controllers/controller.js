const { User, Wishlist } = require("../models");
const { comparePassword } = require("../helpers/bcryptjs");
const { signToken, verifyToken } = require("../helpers/jwt");
const { Op } = require("sequelize");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const fornite_api = process.env.FORTNITE_API_KEY;

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
      console.log(error, "register");
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
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        let checkPassword = comparePassword(password, user.password);
        if (checkPassword) {
          let payload = {
            id: user.id,
            username: user.username,
            email: user.email,
          };
          let access_token = signToken(payload);
          res.status(200).json({
            access_token,
          });
        } else {
          throw {
            name: `Invalid email/password`,
          };
        }
      } else {
        throw {
          name: `Invalid email/password`,
        };
      }
    } catch (error) {
      console.log(error, "login");
      next(error);
    }
  }
  static async googleSign(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.payload;
      console.log(payload);
      const [user, isCreated] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.username,
          email: payload.email,
          password: "google-password",
        },
        hooks: false,
      });
      const access_token = signToken({
        id: user.id,
        username: user.username,
        email: user.email,
      });
      res.status(200).json({
        access_token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getItems(req, res, next) {
    try {
      const { data } = await axios({
        url: "https://fortniteapi.io/v2/items/list?lang=en",
        method: "get",
        headers: { Authorization: fornite_api },
      });
      const filterData = data.items.filter(
        (item) =>
          item.price > 0 &&
          (item.type.id === "outfit" ||
            item.type.id === "pickaxe" ||
            item.type.id === "emote" ||
            item.type.id === "glider" ||
            item.type.id === "backpack" ||
            item.type.id === "wrap")
      );
      // console.log(data);
      res.status(200).json(filterData);
    } catch (error) {
      console.log(error, "getItems");
      next(error);
    }
  }
  static async getShops(req, res, next) {
    try {
      const { data } = await axios({
        url: "https://fortniteapi.io/v2/shop?lang=en",
        method: "get",
        headers: { Authorization: fornite_api },
      });
      const filterData = data.shop.filter(
        (shop) =>
          shop.mainType === "outfit" ||
          shop.mainType === "pickaxe" ||
          shop.mainType === "emote" ||
          shop.mainType === "glider" ||
          shop.mainType === "backpack" ||
          shop.mainType === "wrap" ||
          shop.mainType === "bundle"
      );
      // console.log(filterData);
      res.status(200).json(filterData);
    } catch (error) {
      console.log(error, "getShops");
      next(error);
    }
  }
  static async addWishlist(req, res, next) {
    try {
      const UserId = req.user.id;
      if (!UserId) {
        throw {
          name: `Please Login First`,
        };
      }
      const { ItemId, name, image } = req.body;
      const payload = {
        ItemId,
        name,
        image,
        UserId,
      };
      const newWishlist = await Wishlist.create(payload, {
        include: { model: User, attributes: { exclude: ["password"] } },
      });
      res.status(201).json(newWishlist);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getWishlist(req, res, next) {
    try {
      const UserId = req.user.id;
      const data = await Wishlist.findAll({
        where: {
          UserId,
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        ],
      });
      // console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error, "getWishlist");
      next(error);
    }
  }
  static async editWishlist(req, res, next) {}
  static async deleteWishlist(req, res, next) {
    try {
      const id = req.params.id;
      const foundWishlist = await Wishlist.findByPk(id);
      if (!foundWishlist) {
        throw {
          name: `Item not found`,
        };
      }
      await Wishlist.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: `Item removed from Wishlist`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
