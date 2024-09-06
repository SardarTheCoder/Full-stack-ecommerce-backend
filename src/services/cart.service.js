const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

async function createCart(user) {
  try {
    const cart = new Cart({ user });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findUserCart(userId) {
  try {
    // Find the cart based on the user ID
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If the cart doesn't exist, create one
      cart = await createCart(userId);
    }

    // Fetch cart items along with the product details
    let cartItems = await CartItem.find({ cart: cart._id }).populate("product");
    
    cart.cartItems = cartItems;

    // Calculate total prices and quantities
    let totalPrice = 0;
    let totalDiscountPrice = 0;
    let totalItem = 0;

    for (let cartItem of cart.cartItems) {
      totalPrice += cartItem.price;
      totalDiscountPrice += cartItem.discountedPrice;
      totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.discounte = totalPrice - totalDiscountPrice;

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}



async function addCartItem(userId, req) {
  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await createCart(userId);
    }

    const product = await Product.findById(req.productId);
    console.log("Product:", product);
    // Check if the product is not found
    if (!product) {
      return "Product not found";
    }

    // Check if the cart item already exists
    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });

    // If not present, create and add the cart item
    if (!isPresent) {
      const cartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.price,
        size: req.size,
        discountedPrice: product.discountedPrice,
      });

      // Save the cart item
      const createdCartItem = await cartItem.save();

      // Add the cart item to the cart
      cart.cartItems.push(createdCartItem);
      
      // Save the cart with the new cart item
      await cart.save();

      return "Item added to cart";
    }
  } catch (error) {
    throw new Error(error.message);
  }
}


module.exports = { createCart, findUserCart, addCartItem };

