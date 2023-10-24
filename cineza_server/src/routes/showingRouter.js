const express = require("express");

const { getAllShowController,
    createShowController,
    getAllShowByMovieController,
    getAllShowByRapController } = require("../controller/showingController")

const showingRouter = express.Router()

showingRouter.get("/get-all", getAllShowController);
showingRouter.post("/create", createShowController);
showingRouter.get("/get-all-by-movie/:codeMovie", getAllShowByMovieController);
showingRouter.get("/get-all-by-rap/:codeRap", getAllShowByRapController);

module.exports = showingRouter;