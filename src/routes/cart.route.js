const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const cartController = require("../controller/cart.controller");

router.get("/", authenticate, cartController.findUserCartController);
router.put("/add", authenticate, cartController.addItemToCartController);

module.exports = router;
