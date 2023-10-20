const { db } = require("../models/index.js");

const getAllPriceHeaderService = async () => {
  const allPrice = await db.PriceHeader.findAll();
  return allPrice;
};

const getPriceHeaderByCodeService = async (code) => {
  const priceHeader = await db.PriceHeader.findOne({
    where: {
      code: code,
    },
  });
  return priceHeader;
};

const createPriceHeaderService = async (price) => {
  const newPrice = await db.PriceHeader.create(price);
  return newPrice;
};

const getValuePriceHeaderByCodeService = async (code) => {
  const valuePriceHeader = await db.PriceHeader.findOne({
    where: {
      code: code,
    },
  });
  return valuePriceHeader;
};

const updatePriceHeaderService = async (code, priceHeader) => {
  const updatePriceHeader = await db.PriceHeader.update(priceHeader, {
    where: {
      code: code,
    },
  });
  return updatePriceHeader;
};

module.exports = {
  getAllPriceHeaderService,
  getPriceHeaderByCodeService,
  createPriceHeaderService,
  getValuePriceHeaderByCodeService,
  updatePriceHeaderService,
};
