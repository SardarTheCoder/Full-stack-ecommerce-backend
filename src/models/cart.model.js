const mongoose = require("mongoose");

const cartScheme = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
    cartItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cartItems",
        required:true,
    }],
    totalPrice:{
        type:Number,
        default:0,
        required:true,
    },
    totalItem:{
        type:Number,
        default:0,
        required:true,
    },
    totalDiscountPrice:{
        type:Number,
        default:0,
        required:true,
    },
    discounte:{
        type:Number,
        default:0,
        required:true,
    },
})

const Cart = mongoose.model("cart",cartScheme)
module.exports = Cart;