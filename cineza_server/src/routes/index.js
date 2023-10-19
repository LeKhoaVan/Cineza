const express = require("express");

const hierarchyStructureRouter = require("./hierarchyStuctureRouter");
const valueStructerRouter = require("./valueStructerRouter");
const promotionHeaderRouter = require("./promotionHeaderRouter");
const promotionLineRouter = require("./promotionLineRouter");
const rapRouter = require("./rapRouter");
const roomRouter = require("./roomRouter");
const seatRouter = require("./seatRouter");
const movieRouter = require("./movieRouter");
const movieTypeRouter = require("./movieTypeRouter");
const otherProductRouter = require("./otherProductRouter");

const rootRouter = express.Router();

rootRouter.use("/hierarchy-stucture", hierarchyStructureRouter);
rootRouter.use("/value", valueStructerRouter);
rootRouter.use("/promotion-header", promotionHeaderRouter);
rootRouter.use("/promotion-line", promotionLineRouter);
rootRouter.use("/rap", rapRouter);
rootRouter.use("/room", roomRouter);
rootRouter.use("/seat", seatRouter);
rootRouter.use("/movie", movieRouter);
rootRouter.use("/movie-type", movieTypeRouter);
rootRouter.use("/other-product", otherProductRouter);

module.exports = rootRouter;
