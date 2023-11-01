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
const priceHeaderRouter = require("./priceHeaderRouter");
const priceRouter = require("./priceRouter");
const promotionDetailRouter = require("./promotionDetailRouter");
const typeSeatRouter = require("./typeSeatRouter");
const showingRouter = require("./showingRouter");
const ticketRouter = require("./ticketRouter")

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
rootRouter.use("/promotion-detail", promotionDetailRouter);
rootRouter.use("/other-product", otherProductRouter);
rootRouter.use("/price-header", priceHeaderRouter);
rootRouter.use("/price", priceRouter);
rootRouter.use("/type-seat", typeSeatRouter);
rootRouter.use("/show", showingRouter)
rootRouter.use("/ticket", ticketRouter);

module.exports = rootRouter;
