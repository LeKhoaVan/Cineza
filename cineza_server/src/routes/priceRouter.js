const express = require("express");

const {
  getAllPriceByHeaderController,
  getPriceByCodeController,
  createPriceController,
} = require("../controller/priceController");

const priceRouter = express.Router();

priceRouter.get(
  "/get-all-by-header/:codeHeader",
  getAllPriceByHeaderController
);
priceRouter.get("/get-by-code/:code", getPriceByCodeController);
priceRouter.post("/create", createPriceController);
module.exports = priceRouter;
