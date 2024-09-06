const Review = require("../models/review.model.js");
const productService = require("../services/product.service.js");

async function createReview(reqData,user){
    //find Review on specfic product
    const product = await productService.findProductById(reqData.productId);
    //create Reviews
    const review = new Review({
        user:user._id,
        product:product._id,
        review:reqData.review,
        createdAt:new Date(),
    })
    //save product
    await product.save();
    //save review
    return await review.save();
}

async function getAllReview(productId,reqData){
    const product = await productService.findProductById(reqData.productId);
    return await Review.find({product:productId}).populate("user");
}

module.exports = {createReview,getAllReview}