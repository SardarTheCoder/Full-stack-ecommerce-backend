// search.controller.js
const productService = require("../services/search.service");

exports.searchProducts = async (req, res) => {
    const { query } = req.query;
  
    try {
      const results = await productService.searchProducts(query);
      res.json(results);
    } catch (error) {
      console.error("Error in searchProducts controller:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
