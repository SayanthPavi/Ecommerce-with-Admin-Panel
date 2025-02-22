const express = require("express");

const {
  createOrder,
  capturePayment,
  getOrderDetails,
  getAllOrdersByUserId,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrdersByUserId);
router.get("/details/:id", getOrderDetails);

module.exports = router;
