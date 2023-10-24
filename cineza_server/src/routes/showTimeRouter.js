const express = require("express");

const {
  getAllShowTimeController,
  createShowTimeController,
  getShowTimeByCodeController,
  updateShowTimeController,
} = require("../controller/showTimeController");
const showTimeRouter = express.Router();

showTimeRouter.get("/get-all", getAllShowTimeController);
showTimeRouter.post("/create", createShowTimeController);
showTimeRouter.get("/get-by-code/:code", getShowTimeByCodeController);
showTimeRouter.put("/put/:code", updateShowTimeController);

module.exports = showTimeRouter;
