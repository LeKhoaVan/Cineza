const express = require("express");

const { createOrderController } = require("../controller/orderController")

const orderRouter = express.Router();

orderRouter.post("/save", createOrderController);

module.exports = orderRouter;