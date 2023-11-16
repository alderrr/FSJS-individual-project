const { User, Wishlist } = require("../models");
const { comparePassword } = require("../helpers/bcryptjs");
const { signToken, verifyToken } = require("../helpers/jwt");
const { Op } = require("sequelize");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const transporter = require("../helpers/nodemailer");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const fornite_api = process.env.FORTNITE_API_KEY;
const { CronJob } = require("cron");

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
      console.log(req.headers);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.access_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.payload;
      console.log(payload);
      const [user, isCreated] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
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
      res.status(200).json(data);
    } catch (error) {
      console.log(error, "getWishlist");
      next(error);
    }
  }
  static async getWishlistItem(req, res, next) {
    try {
      const ItemId = req.params.id;
      const UserId = req.user.id;
      const data = await Wishlist.findOne({
        where: {
          UserId,
          ItemId,
        },
      });
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

const sendEmail = async (recipients) => {
  try {
    const options = {
      from: "project.alderder@gmail.com",
      subject: "FortHub Wishlist",
      text: "Your wishlisted item(s) is available now!",
    };
    options.to = recipients.join(","); // Add multiple recipients
    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err, "ERROR TRANSPORTER");
        return;
      }
      console.log("Sent: " + info.response);
    });
  } catch (error) {
    console.log(error, "ERROR NODE MAILER");
    // next(error);
  }
};
const fetchWishlistRecipients = async (ItemIdArray) => {
  try {
    const data = await Wishlist.findAll({
      where: {
        ItemId: ItemIdArray,
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
    const recipients = data.map((recipient) => recipient.User.email);
    return recipients;
  } catch (error) {
    console.error(error, "ERROR FETCHING WISHLIST RECIPIENTS");
    return [];
  }
};
const job = new CronJob(
  "05 07 * * *", // cronTime: At 07:05 Every Day
  async function () {
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
      const ItemIdArray = filterData.map((filter) => {
        return filter.mainId;
      });
      const recipients = await fetchWishlistRecipients(ItemIdArray);
      if (recipients.length > 0) {
        console.log("Sending email to:", recipients.join(", "));
        await sendEmail(recipients);
      } else {
        console.log("No recipients found for the given itemId.");
      }
    } catch (error) {
      console.error(error, "ERROR IN CRON JOB");
    }
  }, // onTick
  null, // onComplete
  true, // start
  "UTC+7" // timeZone
);

job.start();

module.exports = Controller;
