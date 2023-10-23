const {
  getAllPriceByHeaderService,
  getPriceByCodeService,
  createPriceService,
} = require("../services/priceService");

const getAllPriceByHeaderController = async (req, res) => {
  const { codeHeader } = req.params;
  try {
    const allPrice = await getAllPriceByHeaderService(codeHeader);
    res.status(200).send(allPrice);
  } catch (error) {
    res.status(500).send("error get price by code header: " + error);
  }
};

const getPriceByCodeController = async (req, res) => {
  const { code } = req.params;
  try {
    const Price = await getPriceByCodeService(code);
    res.status(200).send(Price);
  } catch (error) {
    res.status(500).send("error get price by code: " + error);
  }
};

const createPriceController = async (req, res) => {
  const { code, value, codeHeader, codeTypeSeat } = req.body;
  try {
    const checkCode = await getPriceByCodeService(code);
    if (checkCode == null) {
      const newPrice = await createPriceService({
        code,
        value,
        codeHeader,
        codeTypeSeat,
      });
      res.status(201).send(newPrice);
    } else {
      res.status(400).send("code is existed");
    }
  } catch (error) {
    res.status(500).send("error create price: " + error);
  }
};

module.exports = {
  getAllPriceByHeaderController,
  getPriceByCodeController,
  createPriceController,
};
