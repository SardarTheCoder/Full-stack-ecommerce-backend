const Rating = require("../models/rating.model.js");
const productService = require("../services/product.service.js");

async function createRating(req, user) {
  //find Rating on specfic product
  const product = await productService.findProductById(req, productId);
  //create Rating
  const rating = new Rating({
    product: product._id,
    user: user._id,
    rating: req.rating,
    createdAt: new Date(),
  });
  return await rating.save();
}
async function getProductRating(productId) {
  return await Rating.find({ product: productId });
}

module.exports = { createRating, getProductRating };
