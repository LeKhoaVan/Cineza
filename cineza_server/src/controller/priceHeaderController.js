const { default: axios } = require("axios");
const {
  getAllPriceHeaderService,
  getPriceHeaderByCodeService,
  createPriceHeaderService,
  getValuePriceHeaderByCodeService,
  updatePriceHeaderService,
} = require("../services/priceHeaderService");

const getAllPriceHeaderController = async (req, res) => {
  try {
    const Price = await getAllPriceHeaderService();
    res.status(200).send(Price);
  } catch (error) {
    res.status(500).send("Error get all Price: " + error);
  }
};

const createPriceHeaderController = async (req, res) => {
  const { code, startDay, endDay, description, type, status } = req.body;
  try {
    const checkCode = await getPriceHeaderByCodeService(code);
    if (checkCode == null) {
      const newPrice = await createPriceHeaderService({
        code,
        startDay,
        endDay,
        description,
        type,
        status,
      });
      res.status(201).send(newPrice);
    } else {
      res.status(400).send("code is existed");
    }
  } catch (error) {
    res.status(500).send("error create Price: " + error);
  }
};

const getPriceHeaderByCodeController = async (req, res) => {
  const { code } = req.params;
  try {
    const priceHeader = await getPriceHeaderByCodeService(code);
    res.status(200).send(priceHeader);
  } catch (error) {
    res.status(500).send("error get Price header: " + error);
  }
};

const updatePriceHeaderController = async (req, res) => {
  try {
    const { code } = req.params;
    const { startDay, endDay, description, type, status } = req.body;

    const checkPriceHeader = await getValuePriceHeaderByCodeService(code);
    if (checkPriceHeader != null) {
      const updatePriceHeader = await updatePriceHeaderService(code, {
        startDay,
        endDay,
        description,
        type,
        status,
      });
      if (updatePriceHeader != 0) {
        res.status(200).send("update success");
      } else {
        res.status(400).sern("update fail");
      }
    } else {
      res.status(400).send("rap not is existed");
    }
  } catch (error) {
    res.status(500).send("error update Price Header: " + error);
  }
};

module.exports = {
  getAllPriceHeaderController,
  createPriceHeaderController,
  getPriceHeaderByCodeController,
  updatePriceHeaderController,
};
