const Controller = require("../controllers/controller");
const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-sign", Controller.googleSign);
router.get("/items", Controller.getItems);
router.get("/shops", Controller.getShops);

router.get("/nodemailer", Controller.nodemailer);

router.use(authentication);

router.post("/wishlist", Controller.addWishlist);
router.get("/wishlist", Controller.getWishlist);
router.get("/wishlist/:id", Controller.getWishlistItem);

router.put("/wishlist/:id", Controller.editWishlist);
router.delete("/wishlist/:id", Controller.deleteWishlist);

module.exports = router;
