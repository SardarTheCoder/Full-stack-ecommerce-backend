const Product = require('../models/product.model');
const Wishlist = require('../models/wishlist.model');

const addToWishlist = async (productId) => {
    const wishlistItem = new Wishlist({
      product: productId,
    });
  
    await wishlistItem.save();
    return { message: 'Product added to wishlist successfully' };
  };
  
  const getWishlist = async () => {
    const wishlist = await Wishlist.find().populate('product', 'title description price discountedPrice brand color imageUrl');
    return wishlist;
  };
  
  const removeFromWishlist = async (productId) => {
    await Wishlist.deleteOne({ product: productId});
    return { message: 'Product removed from wishlist successfully' };
  };
  module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist
  };
