const express = require("express")

const { createRapController, getAllRapController } = require("../controller/rapController")

const rapRouter = express.Router();

rapRouter.get("/get-all", getAllRapController);
rapRouter.get("get-by-code");
rapRouter.post("/create", createRapController);

module.exports = rapRouter;