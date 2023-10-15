const express = require("express");

const { createRoomController, getAllRoomController, getRoomByCodeController, getAllRoomByRapCodeController } = require("../controller/roomController");
const roomRouter = express.Router();

roomRouter.get("/get-all", getAllRoomController);
roomRouter.get("/get-all-by-code/:codeRap", getAllRoomByRapCodeController)
roomRouter.get("/get-by-code/:code", getRoomByCodeController);
roomRouter.post("/create", createRoomController);

module.exports = roomRouter