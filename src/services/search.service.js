// search.service.js
const Product = require("../models/product.model");

exports.searchProducts = async (query) => {
  try {
    // Create a regular expression for partial matching
    const regex = new RegExp(query, "i"); // "i" for case-insensitive match

    // Use a single $or condition to search across multiple fields
    const results = await Product.find({
      $or: [
        { title: { $regex: regex } },
        { brand: { $regex: regex } },
      ],
    })

    return results;
  } catch (error) {
    console.error("Error in searchProducts service:", error);
    throw error;
  }
};

