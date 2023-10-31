const express = require("express");

const { createMovie, getAllMovie, getByCodeMovie,
    updateMovie, updateStatusMovie, getMovieByDateController, getDateByMovieController } = require("../controller/movieController")
const { handUploadFile } = require("../middlewares/upload/uploadImage/index");

const movieRouter = express.Router();

movieRouter.get("/get-all", getAllMovie);
movieRouter.get("/:movieCode", getByCodeMovie);
movieRouter.get("/get-movie-by-date/:date", getMovieByDateController)
movieRouter.get("/get-date/:codeMovie", getDateByMovieController)
movieRouter.post("/create", handUploadFile, createMovie);
movieRouter.put("/update/:movieCode", updateMovie);
movieRouter.put("/change-status/:movieCode", updateStatusMovie)

module.exports = movieRouter;