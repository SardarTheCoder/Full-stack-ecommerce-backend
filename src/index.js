const express = require("express");
const cors = require("cors"); // use to integrate with frontend to unblock api in browsers
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).send({ message: "Welcome To E-commerce Website", status: true });
});

// Router for auth
const authRouters = require("./routes/auth.route");
app.use("/auth", authRouters);

// Router For user
const userRouters = require("./routes/user.route");
app.use("/api/users", userRouters);

// Customer product Router
const CustomerproductRouter = require("./routes/customerProduct.route.js");
app.use("/api/products", CustomerproductRouter);

// Admin product Router
const AdminproductRouter = require("./routes/adminproduct.route.js");
app.use("/api/admin/products", AdminproductRouter);

// Admin order Router
const AdminorderRouter = require("./routes/adminOrder.route.js");
app.use("/api/admin/orders", AdminorderRouter);

// Cart router
const cartRouter = require("./routes/cart.route.js");
app.use("/api/cart", cartRouter);

// CartItem Router
const cartItemRouter = require("./routes/cartItem.route.js");
app.use("/api/cart_Items", cartItemRouter);

// Order Router
const orderRouter = require("./routes/order.route.js");
app.use("/api/orders", orderRouter);

// Review Router
const reviewRouter = require("./routes/review.route.js");
app.use("/api/reviews", reviewRouter);

// Rating Router
const ratingRouter = require("./routes/rating.route.js");
app.use("/api/ratings", ratingRouter);

//search bar Route
const searchRouter = require("./routes/search.route.js");
app.use("/api", searchRouter);

//wishlish route
const wishlistRoute = require('./routes/wishlist.route');
app.use('/api', wishlistRoute);

//admin route
const adminRoutes = require('./routes/admin.route.js');
app.use('/admin', adminRoutes);


module.exports = app;
