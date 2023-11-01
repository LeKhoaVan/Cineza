const { all } = require("axios");
const {
  getAllShowService,
  getShowByCodeService,
  createShowService,
  updateShowService,
  getAllShowByMovieService,
  getAllShowByRapService,
  checkShow,
  getAllShowByMovieAndRapService,
  getShowByMovieAndDateService,
  getShowByRapAndDateService,
  getShowByRapMovieAndDateService,
} = require("../services/showingService");

const { getByCodeService } = require("../services/movieService");
const { INTEGER } = require("sequelize");

const getAllShowController = async (req, res) => {
  try {
    const allShow = await getAllShowService();
    res.status(200).send(allShow);
  } catch (error) {
    res.status(500).send("error get all show controller: " + error);
  }
};

const getShowByCodeController = async (req, res) => {
  const { code } = req.params;
  try {
    const show = await getShowByCodeService(code);
    res.status(200).send(show);
  } catch (error) {
    res.status(500).send("error get Show: " + error);
  }
};

const getShowByMovieAndDateController = async (req, res) => {
  const { codeMovie, date } = req.params;
  try {
    const shows = await getShowByMovieAndDateService(codeMovie, date);
    res.status(200).send(shows);
  } catch (error) {
    res.status(500).send("error get show by movie and date: " + error);
  }
}

const getShowByRapAndDateController = async (req, res) => {
  const { codeRap, date } = req.params;
  try {
    const shows = await getShowByRapAndDateService(codeRap, date);
    res.status(200).send(shows);
  } catch (error) {
    res.status(500).send("error get show by rap and date: " + error);
  }
}

const getShowByRapMovieAndDateController = async (req, res) => {
  const { codeRap, codeMovie, date } = req.params;
  try {
    const shows = await getShowByRapMovieAndDateService(codeRap, codeMovie, date);
    res.status(200).send(shows);
  } catch (error) {
    res.status(500).send("error get show by rap, movie, date: " + error)
  }
}

const createShowController = async (req, res) => {
  const { code, codeMovie, codeRap, codeRoom, showDate, showStart, status } = req.body;

  const newShowDate = new Date(showDate)
  const newShowStart = new Date(showDate)
  const newShowEnd = new Date(showDate);

  newShowDate.setHours(0, 0, 0, 0);

  const timeShowStart = showStart.split(":");
  newShowStart.setHours(timeShowStart[0], timeShowStart[1], 0, 0)
  newShowEnd.setHours(timeShowStart[0], timeShowStart[1], 0, 0)
  try {
    const movie = await getByCodeService(codeMovie);
    const check = await checkShow(codeMovie, codeRap, codeRoom, newShowDate.toISOString(), newShowStart.toISOString());

    const dataTime = movie.movieTime.split("h");

    if (check == null) {
      // set thoi gian ket thuc showing
      newShowEnd.setHours(newShowEnd.getHours() + parseInt(dataTime[0]));
      newShowEnd.setMinutes(newShowEnd.getMinutes() + parseInt(dataTime[1]));
      newShowEnd.setMinutes(newShowEnd.getMinutes() + 15);
      const newShow = await createShowService({
        code, codeMovie, codeRap, codeRoom, showDate: newShowDate, showStart: newShowStart, showEnd: newShowEnd, status
      });
      res.status(201).send(newShow);
    } else {
      res.status(400).send("Suất chiếu đã tồn tại");
    }
  } catch (error) {
    res.status(500).send("error create new show: " + error);
  }
};

const updateShowController = async (req, res) => {
  try {
    const { code } = req.params;
    const { codeMovie, codeRap, codeRoom, codeShowTime, screenAt, status } =
      req.body;

    const checkShowTime = await getShowByCodeService(code);
    // const check = await checkShow(screenAt, codeRap, codeRoom, codeShowTime);
    if (checkShowTime != null) {
      const updateShowTime = await updateShowService(code, {
        codeMovie,
        codeRap,
        codeRoom,
        codeShowTime,
        screenAt,
        status,
      });
      if (updateShowTime != 0) {
        res.status(200).send("update success");
      } else {
        res.status(400).sern("update fail");
      }
    } else {
      res.status(400).send("Show not is existed");
    }
  } catch (error) {
    res.status(500).send("error update Show: " + error);
  }
};

const getAllShowByMovieController = async (req, res) => {
  const { codeMovie } = req.params;
  try {
    const allShow = await getAllShowByMovieService(codeMovie);
    res.status(200).send(allShow);
  } catch (error) {
    res.status(500).send("error get show by movie: " + error);
  }
};

const getAllShowByRapController = async (req, res) => {
  const { codeRap } = req.params;
  try {
    const allShow = await getAllShowByRapService(codeRap);
    res.status(200).send(allShow);
  } catch (error) {
    res.status(500).send("error get show by rap: " + error);
  }
};

const getAllShowByMovieAndRap = async (req, res) => {
  const { codeMovie, codeRap } = req.params;
  try {
    const shows = await getAllShowByMovieAndRapService(codeMovie, codeRap)
    res.status(200).send(shows);
  } catch (error) {
    res.status(500).send("error get show by movie and rap: " + error);
  }
}

module.exports = {
  getAllShowController,
  getShowByCodeController,
  createShowController,
  updateShowController,
  getAllShowByMovieController,
  getAllShowByRapController,
  getAllShowByMovieAndRap,
  getShowByMovieAndDateController,
  getShowByRapAndDateController,
  getShowByRapMovieAndDateController,
};
