const express = require("express");

const {
  getAllShowController,
  getShowByCodeController,
  createShowController,
  getAllShowByMovieController,
  getAllShowByRapController,
} = require("../controller/showingController");

const showingRouter = express.Router();

showingRouter.get("/get-all", getAllShowController);
showingRouter.get("/get-by-code/:code", getShowByCodeController);
showingRouter.post("/create", createShowController);
showingRouter.get("/get-all-by-movie/:codeMovie", getAllShowByMovieController);
showingRouter.get("/get-all-by-rap/:codeRap", getAllShowByRapController);

module.exports = showingRouter;
