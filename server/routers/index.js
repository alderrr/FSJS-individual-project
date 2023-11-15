const Controller = require("../controllers/controller");
const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

// const multerUpload = require("../middlewares/multer");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-sign", Controller.googleSign);
router.get("/items", Controller.getItems);
router.get("/shops", Controller.getShops);

router.use(authentication);

router.post("/wishlist", Controller.addWishlist);
router.get("/wishlist", Controller.getWishlist);

router.put("/wishlist/:id", Controller.editWishlist);
router.delete("/wishlist/:id", Controller.deleteWishlist);

// router.post("/wishlist", Controller.addCuisine);
// router.get("/wishlist", Controller.readCuisines);
// router.get("/cuisines/:id", Controller.readCuisine);

// router.put("/cuisines/:id", authorization, Controller.updateCuisine);
// router.patch(
//   "/cuisines/:id",
//   authorization,
//   multerUpload,
//   Controller.updateImgUrlCuisine
// );
// router.delete("/cuisines/:id", authorization, Controller.deleteCuisine);

module.exports = router;
