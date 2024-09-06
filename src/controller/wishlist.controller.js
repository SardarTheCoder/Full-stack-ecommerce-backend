const WishlistService = require('../services/wishlist.service');

const addToWishlist = async (req, res) => {
    try {
      const { productId } = req.params;
  
      const result = await WishlistService.addToWishlist(productId);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
  
  const getWishlist = async (req, res) => {
    try {
      const wishlist = await WishlistService.getWishlist();
      res.status(200).json(wishlist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };

  const removeFromWishlist = async (req, res) => {
    try {
      const { productId } = req.params;
  
      // Assuming you have a user ID available in the request object
      // const userId = req.user.id;
  
      const result = await WishlistService.removeFromWishlist(productId);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
  
  module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist
  };