const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true,
    text: true,
  },
  description: {
    type: String,
    required:true,
    text: true,
  },
  price: {
    type: Number,
    required:true,
  },
  discountedPrice:{
    type:Number,
  },
  discountPersent: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    text: true,
  },
  color: {
    type: String,
  },
  size: [
    {
      name: { type: String },
      quantity: { type: Number },
    },
  ],
  imageUrl: {
    type: String,
  },
  rating: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings",
    },
  ],
  reviews:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"reviews",
    },
  ],
  numRatings:{
    type:Number,
    default:0,
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"categories",
    // text: true,
  },
  createdAt:{
    type:Date,
    default:Date.now(),
  }
});
productSchema.index({ title: "text", brand: "text" });

const Product = mongoose.model("products",productSchema);
module.exports = Product;
