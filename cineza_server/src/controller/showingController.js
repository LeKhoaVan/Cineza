const { all } = require("axios");
const { getAllShowService,
    createShowService,
    getAllShowByMovieService,
    getAllShowByRapService,
    checkShow } = require("../services/showingService");

const getAllShowController = async (req, res) => {
    try {
        const allShow = await getAllShowService();
        res.status(200).send(allShow);
    } catch (error) {
        res.status(500).send("error get all show controller: " + error)
    }
}

const createShowController = async (req, res) => {
    const { code, codeMovie, codeRap, codeRoom, codeShowTime, screenAt, status } = req.body;
    try {
        const check = await checkShow(screenAt, codeRap, codeRoom, codeShowTime);
        if (check == null) {
            const newShow = await createShowService({ code, codeMovie, codeRap, codeRoom, codeShowTime, screenAt, status });
            res.status(201).send(newShow);
        } else {
            res.status(400).send("Suất chiếu đã tồn tại")
        }
    } catch (error) {
        res.status(500).send("error create new show: " + error);
    }
}

const getAllShowByMovieController = async (req, res) => {
    const { codeMovie } = req.params;
    try {
        const allShow = await getAllShowByMovieService(codeMovie);
        res.status(200).send(allShow);
    } catch (error) {
        res.status(500).send("error get show by movie: " + error);
    }
}

const getAllShowByRapController = async (req, res) => {
    const { codeRap } = req.params;
    try {
        const allShow = await getAllShowByRapService(codeRap);
        res.status(500).send(allShow);
    } catch (error) {
        res.status(500).send("error get show by rap: " + error);
    }
}

module.exports = {
    getAllShowController,
    createShowController,
    getAllShowByMovieController,
    getAllShowByRapController
}