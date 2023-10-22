const { db } = require("../models/index");

const getAllPriceByHeaderService = async (codeHeader) => {
  const allPrice = await db.Price.findAll({
    where: {
      codeHeader: codeHeader
    }
  });
  return allPrice;
};

const getPriceByCodeService = async (code) => {
  const price = await db.Price.findOne({
    where: {
      code: code,
    },
  });
  return price;
};

const createPriceService = async (price) => {
  const priceNew = await db.Price.create(price);
  return priceNew;
};

module.exports = {
  getAllPriceByHeaderService,
  getPriceByCodeService,
  createPriceService,
};
