const { db } = require("../models/index");

const getAllPriceByHeaderService = async (codeHeader) => {
  const query = `select pr.code, pr.value, pr.codeTypeSeat, pr.codeHeader, ph.description as nameHeader, ts.type as typeSeat from price as pr
        join priceheader as ph on pr.codeHeader = ph.code
        join typeseat as ts on pr.codeTypeSeat = ts.code
        where pr.codeHeader = '${codeHeader}'`;

  const [allPrice, metadata] = await db.sequelize.query(query);
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

const getValuePriceByCodeService = async (code) => {
  const valuePrice = await db.Price.findOne({
    where: {
      code: code,
    },
  });
  return valuePrice;
};

const updatePriceService = async (code, price) => {
  const updatePrice = await db.Price.update(price, {
    where: {
      code: code,
    },
  });
  return updatePrice;
};

module.exports = {
  getAllPriceByHeaderService,
  getPriceByCodeService,
  createPriceService,
  getValuePriceByCodeService,
  updatePriceService,
};
