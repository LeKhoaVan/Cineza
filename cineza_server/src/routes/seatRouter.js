const {
  getAllSeatController,
  getAllSeatByRoomController,
  createSeatController,
  getSeatByCodeController,
  updateSeatController,
} = require("../controller/seatController");

const express = require("express");

const seatRouter = express.Router();

seatRouter.get("/get-all", getAllSeatController);
seatRouter.get("/get-all-by-room/:codeRoom", getAllSeatByRoomController);
seatRouter.post("/create", createSeatController);
seatRouter.get("/get-by-code/:code", getSeatByCodeController);
seatRouter.put("/put/:code", updateSeatController);

module.exports = seatRouter;
