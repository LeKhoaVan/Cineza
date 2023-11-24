const { QueryTypes } = require("sequelize");
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

const checkTimePriceHeader = async (startDay) => {
  const query = `select * from priceheader as ph
  where "${startDay}" < ph.endDay and ph.status = "Hoạt động";`
  const resultData = await db.sequelize.query(query, { type: QueryTypes.SELECT });
  return resultData;
}

const updateStatusAllService = async (startDay) => {
  const query = `
  UPDATE priceheader as ph
  SET status = "Khóa tạm thời"
  WHERE "${startDay}" < ph.endDay;`;

  const resultData = await db.sequelize.query(query, { type: QueryTypes.UPDATE });
  return resultData;
}



module.exports = {
  getAllPriceHeaderService,
  getPriceHeaderByCodeService,
  createPriceHeaderService,
  getValuePriceHeaderByCodeService,
  updatePriceHeaderService,
  checkTimePriceHeader,
  updateStatusAllService,
};
