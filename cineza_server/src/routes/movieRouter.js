const express = require("express");

const { createMovie, getAllMovie, getByCodeMovie,
    updateMovie, updateStatusMovie } = require("../controller/movieController")
const { handUploadFile } = require("../middlewares/upload/uploadImage/index");

const movieRouter = express.Router();

movieRouter.get("/get-all", getAllMovie);
movieRouter.get("/:movieCode", getByCodeMovie);
movieRouter.post("/create", handUploadFile, createMovie);
movieRouter.put("/update/:movieCode", updateMovie);
movieRouter.put("/change-status/:movieCode", updateStatusMovie)

module.exports = movieRouter;