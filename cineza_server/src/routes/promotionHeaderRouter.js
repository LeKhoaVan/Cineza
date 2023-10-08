const express = require("express");

const { getAllPromotionHeaderController,
    createPromotionHeaderController } = require("../controller/promotionHeaderController");
const promotionHeaderRouter = express.Router();

promotionHeaderRouter.get("/get-all", getAllPromotionHeaderController);
promotionHeaderRouter.post("/create", createPromotionHeaderController);
// promotionHeaderRouter.get("/get-code/:code",);

module.exports = promotionHeaderRouter;