const express = require("express");

const {
  getAllPriceHeaderController,
  createPriceHeaderController,
  getPriceHeaderByCodeController,
  updatePriceHeaderController,
} = require("../controller/priceHeaderController");
const priceHeaderRouter = express.Router();

priceHeaderRouter.get("/get-all", getAllPriceHeaderController);
priceHeaderRouter.post("/create", createPriceHeaderController);
priceHeaderRouter.get("/get-code/:code", getPriceHeaderByCodeController);
priceHeaderRouter.put("/put/:code", updatePriceHeaderController);

module.exports = priceHeaderRouter;
