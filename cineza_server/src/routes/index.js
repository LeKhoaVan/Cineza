const express = require("express");

const movieRouter = require("./movieRouter");

const rootRouter = express.Router();


rootRouter.use("/movies", movieRouter);

module.exports = rootRouter;