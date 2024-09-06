const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },
});

const Wishlist = mongoose.model('wishlist', wishlistSchema);
module.exports = Wishlist;
