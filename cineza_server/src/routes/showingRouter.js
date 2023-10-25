const express = require("express");

const {
  getAllShowController,
  getShowByCodeController,
  createShowController,
  updateShowController,
  getAllShowByMovieController,
  getAllShowByRapController,
} = require("../controller/showingController");

const showingRouter = express.Router();

showingRouter.get("/get-all", getAllShowController);
showingRouter.get("/get-by-code/:code", getShowByCodeController);
showingRouter.post("/create", createShowController);
showingRouter.put("/put/:code", updateShowController);
showingRouter.get("/get-all-by-movie/:codeMovie", getAllShowByMovieController);
showingRouter.get("/get-all-by-rap/:codeRap", getAllShowByRapController);

module.exports = showingRouter;
