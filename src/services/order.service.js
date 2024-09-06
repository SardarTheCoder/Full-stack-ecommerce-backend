const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const OrderItem = require("../models/orderItems.js");
const cartService = require("../services/cart.service.js");

async function createOrder(user, shippAddress) {
  let address;
  // console.log("shippAddress:", shippAddress);
  // console.log("user",user);

  if (shippAddress._id) {
    console.log("shippAddress._id", shippAddress._id);
    let existAddress = await Address.findById(shippAddress._id);
    address = existAddress;
    // console.log("address",address)
    // console.log("existAddress",existAddress)
  } else {
    //create New Address
    address = new Address(shippAddress);
    address.user = user;
    // console.log("user",user);
    await address.save();

    // console.log(" user.addresses", user.address)

    user.address.push(address);
    await user.save();
  }

  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];
  for (const item of cart.cartItems) {
    const orderItem = new OrderItem({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });
    //save order
    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
  }
  //create orders

  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountPrice: cart.totalDiscountPrice, 
    discounte: cart.discounte,
    totalItem: cart.totalItem,
    shippAddress: address,
    orderStatus: cart.orderStatus,
    createdAt: cart.createdAt,
  });

  //save order
  const savedOrder = await createdOrder.save();
  return savedOrder;
}
//(For Admin)

//place order

async function placeOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETE";
  return await order.save();
}

//conform Order

async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CONFIMED";
  return await order.save();
}
//Shipped Order

async function shipOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "SHIPPED";
  return await order.save();
}
//Delivered Order
async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "DELIVED";
  return await order.save();
}

//Cancel Order

async function cancelledOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CANCELLED";
  return await order.save();
}
//Find order by ID

async function findOrderById(orderId) {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippAddress");
  return order;
}
//History

async function userOrderHistory(userId) {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}
//All Order

async function getAllOrders() {
  return await Order.find()
    .populate({ path: "orderItems", populate: { path: "product", model: 'products' } })
    .lean();
}
//delete Orders

async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
}

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  deliverOrder,
  cancelledOrder,
  findOrderById,
  userOrderHistory,
  getAllOrders,
  deleteOrder,
};
