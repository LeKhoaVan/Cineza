const express = require("express");

const { createRoomController, getAllRoomController, getRoomByCodeController } = require("../controller/roomController");
const roomRouter = express.Router();

roomRouter.get("/get-all", getAllRoomController);
roomRouter.get("/get-by-code/:code", getRoomByCodeController);
roomRouter.post("/create", createRoomController);

module.exports = roomRouter