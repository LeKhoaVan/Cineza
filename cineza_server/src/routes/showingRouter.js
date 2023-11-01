const express = require("express");

const {
  getAllShowController,
  getShowByCodeController,
  createShowController,
  updateShowController,
  getAllShowByMovieController,
  getAllShowByRapController,
  getAllShowByMovieAndRap,
  getShowByMovieAndDateController,
  getShowByRapAndDateController,
  getShowByRapMovieAndDateController,
} = require("../controller/showingController");

const showingRouter = express.Router();

showingRouter.get("/get-all", getAllShowController);
showingRouter.get("/get-by-code/:code", getShowByCodeController);
showingRouter.post("/create", createShowController);
showingRouter.put("/put/:code", updateShowController);
showingRouter.get("/get-all-by-movie/:codeMovie", getAllShowByMovieController);
showingRouter.get("/get-all-by-rap/:codeRap", getAllShowByRapController);
showingRouter.get("/get-by-movie-and-rap/:codeMovie/:codeRap", getAllShowByMovieAndRap)
showingRouter.get("/get-by-movie-date/:codeMovie/:date", getShowByMovieAndDateController);
showingRouter.get("/get-by-rap-date/:codeRap/:date", getShowByRapAndDateController)
showingRouter.get("/get-by-rap-movie-data/:codeRap/:codeMovie/:date", getShowByRapMovieAndDateController)

module.exports = showingRouter;
