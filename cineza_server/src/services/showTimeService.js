const { db } = require("../models/index.js");

const getAllShowTimeService = async () => {
  const allShowTime = await db.ShowTime.findAll();
  return allShowTime;
};

const getShowTimeByCodeService = async (code) => {
  const showTime = await db.ShowTime.findOne({
    where: {
      code: code,
    },
  });
  return showTime;
};

const createShowTimeService = async (showTime) => {
  const newShowTime = await db.ShowTime.create(showTime);
  return newShowTime;
};

const getValueShowTimeByCodeService = async (code) => {
  const valueShowTime = await db.ShowTime.findOne({
    where: {
      code: code,
    },
  });
  return valueShowTime;
};

const updateShowTimeService = async (code, showTime) => {
  const updateShowTime = await db.ShowTime.update(showTime, {
    where: {
      code: code,
    },
  });
  return updateShowTime;
};

module.exports = {
  getAllShowTimeService,
  getShowTimeByCodeService,
  createShowTimeService,
  getValueShowTimeByCodeService,
  updateShowTimeService,
};
