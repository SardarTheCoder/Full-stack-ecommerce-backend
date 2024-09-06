const express = require('express');
const router = express.Router();
const WishlistController = require('../controller/wishlist.controller');
const authenticate = require('../middleware/authenticate'); // Assuming you have authentication middleware

// Add a product to the wishlist
router.post('/wishlist/:productId', authenticate, WishlistController.addToWishlist);

// Get user's wishlist
router.get('/wishlist', authenticate, WishlistController.getWishlist);

//delete 
router.delete('/wishlist/:productId', authenticate, WishlistController.removeFromWishlist);

module.exports = router;
