const { getAllSeatService,
    getAllSeatByCodeRoomService,
    createSeatService } = require("../services/seatService")

const getAllSeatController = async (req, res) => {
    try {
        const allSeat = await getAllSeatService();
        res.status(200).send(allSeat);
    } catch (error) {
        res.status(500).send("error get all seat: " + error);
    }
}

const getAllSeatByRapController = async (req, res) => {
    const { codeRoom } = req.params;
    try {
        const allSeat = await getAllSeatByCodeRoomService(codeRoom);
        res.status(200).send(allSeat);
    } catch (error) {
        res.status(500).send("error get all seat by room: " + error)
    }
}

const createSeatController = async (req, res) => {
    const { code, type, position, codeRoom, status } = req.body;
    try {
        const newSeat = await createSeatService({ code, type, position, codeRoom, status });
        res.status(201).send(newSeat);
    } catch (error) {
        res.status(500).send("error save seat: " + error)
    }
}

module.exports = {
    getAllSeatController,
    getAllSeatByRapController,
    createSeatController,
}