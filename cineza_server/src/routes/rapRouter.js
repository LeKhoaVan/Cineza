const express = require("express")

const { createRapController, getAllRapController, getRapByCodeController } = require("../controller/rapController")

const rapRouter = express.Router();

rapRouter.get("/get-all", getAllRapController);
rapRouter.get("/get-by-code/:code", getRapByCodeController);
rapRouter.post("/create", createRapController);

module.exports = rapRouter;