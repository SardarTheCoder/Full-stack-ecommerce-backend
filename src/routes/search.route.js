// search.route.js
const express = require("express");
const router = express.Router();
const searchController = require("../controller/search.controller");

router.get("/search", searchController.searchProducts);

module.exports = router;
