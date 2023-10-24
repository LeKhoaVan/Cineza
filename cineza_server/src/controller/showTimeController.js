const { default: axios } = require("axios");
const {
  getAllShowTimeService,
  getShowTimeByCodeService,
  createShowTimeService,
  getValueShowTimeByCodeService,
  updateShowTimeService,
} = require("../services/showTimeService");

const getAllShowTimeController = async (req, res) => {
  try {
    const Price = await getAllShowTimeService();
    res.status(200).send(Price);
  } catch (error) {
    res.status(500).send("Error get all Show Time: " + error);
  }
};

const createShowTimeController = async (req, res) => {
  const { code, showDate, status } = req.body;
  try {
    const checkCode = await getShowTimeByCodeService(code);
    if (checkCode == null) {
      const newPrice = await createShowTimeService({
        code,
        showDate,
        status,
      });
      res.status(201).send(newPrice);
    } else {
      res.status(400).send("code is existed");
    }
  } catch (error) {
    res.status(500).send("error create Show Time: " + error);
  }
};

const getShowTimeByCodeController = async (req, res) => {
  const { code } = req.params;
  try {
    const showTime = await getShowTimeByCodeService(code);
    res.status(200).send(showTime);
  } catch (error) {
    res.status(500).send("error get Show Time: " + error);
  }
};

const updateShowTimeController = async (req, res) => {
  try {
    const { code } = req.params;
    const { showDate, status } = req.body;

    const checkShowTime = await getValueShowTimeByCodeService(code);
    if (checkShowTime != null) {
      const updateShowTime = await updateShowTimeService(code, {
        showDate,
        status,
      });
      if (updateShowTime != 0) {
        res.status(200).send("update success");
      } else {
        res.status(400).sern("update fail");
      }
    } else {
      res.status(400).send("Show Time not is existed");
    }
  } catch (error) {
    res.status(500).send("error update Show Time: " + error);
  }
};

module.exports = {
  getAllShowTimeController,
  createShowTimeController,
  getShowTimeByCodeController,
  updateShowTimeController,
};
