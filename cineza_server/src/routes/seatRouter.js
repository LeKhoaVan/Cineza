const { getAllSeatController,
    getAllSeatByRapController,
    createSeatController } = require("../controller/seatController");

const express = require("express")



const seatRouter = express.Router();

seatRouter.get("/get-all", getAllSeatController);
seatRouter.get("/get-all-by-room/:codeRoom", getAllSeatByRapController)
seatRouter.post("/create", createSeatController)

module.exports = seatRouter;