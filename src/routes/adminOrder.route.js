const express = require("express")
const router= express.Router();
const orderController = require("../controller/adminOrder.controller.js");
const  authenticate  = require("../middleware/authenticate.js");

router.get("/",orderController.getAllOrders)
router.put("/:orderId/confirmed",orderController.confirmedOrders);
router.put("/:orderId/ship",orderController.shippOrders);
router.put("/:orderId/deliver",orderController.deliverOrders);
router.put("/:orderId/cancel",orderController.cancelledOrders);
router.delete("/:orderId/delete",orderController.deleteOrders);



module.exports = router;