const { findUserCart, addCartItem } = require("../services/cart.service.js");

const findUserCartController = async (req, res) => {
  const user = req.user;
  try {
    const cart = await findUserCart(user._id);
    return res.status(200).send(cart);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const addItemToCartController = async (req, res) => {
    const user = req.user;
    try {
      // Extract productId and size from req.body
      const { productId, size } = req.body;
  
      // Check if productId and size are present in the request
      if (!productId || !size) {
        return res.status(400).send({ error: "productId and size are required in the request body" });
      }
  
      // Call addCartItem with the correct arguments
      const cartItem = await addCartItem(user._id, { productId, size });
      return res.status(200).send(cartItem);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };
  

module.exports = { findUserCartController, addItemToCartController };
