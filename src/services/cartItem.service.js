const CartItem = require("../models/cartItem.model");
const userServices = require("../services/user.service");

//update Cart Item
const updateCartItem = async (userId, cartItemId, cartItemData) => {
  try {
      const item = await findCartItemById(cartItemId);

      if (!item) {
          throw new Error("Cart Item Not Found");
      }

      const user = await userServices.findUserById(item.userId);

      if (!user) {
          throw new Error("User Not Found");
      }

      if (user._id.toString() === userId.toString()) {
          // console.log("Before calculation - quantity:", cartItemData.quantity);
          // console.log("Before calculation - discountedPrice:", cartItemData.discountedPrice);
          // console.log("Before calculation - product discountedPrice:", item.product.discountedPrice);

          item.quantity = cartItemData.quantity;
          item.price = item.quantity * item.product.price;

          // Set discountedPrice to a default value if not provided in cartItemData
          item.discountedPrice = cartItemData.discountedPrice || 0;

          console.log("After calculation - discountedPrice:", item.discountedPrice);

          const updatedCartItem = await item.save();
          return updatedCartItem;
      } else {
          throw new Error("You can not update Cart Item");
      }
  } catch (error) {
      throw new Error(error.message);
  }
}



//remove cartItems
async function removeCartItem(userId, cartItemId) {
  const cartItem = await findCartItemById(cartItemId);
  const user = await userServices.findUserById(userId);

  console.log(user._id.toString() ,cartItem.userId.toString());

  if (user._id.toString() === cartItem.userId.toString()) {
    return await CartItem.findByIdAndDelete(cartItemId);
  }
  throw new Error("you cant remove another user's items");
}

//find cart item by Id

async function findCartItemById(cartItemId) {
  const cartItem = await CartItem.findById(cartItemId).populate("product");
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("cart item not found with Id ", cartItemId);
  }
}

module.exports = { updateCartItem, removeCartItem, findCartItemById };
