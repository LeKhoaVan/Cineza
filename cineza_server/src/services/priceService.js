const { db } = require("../models/index");

const getAllPriceByHeaderService = async (codeHeader) => {
  const query = `select p.code, p.value , pl.type, pl.codeHeader, p1.codeMovie from Price as p 
        join PriceHeader as ph on p.codeHeader = ph.code 
        join Movie as mo on p.codeMovie = mo.code
        where ph.code = '${codeHeader}'`;
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

module.exports = {
  getAllPriceByHeaderService,
  getPriceByCodeService,
  createPriceService,
};
