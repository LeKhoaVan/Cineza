const { getAllSeatService,
    getAllSeatByCodeRoomService,
    createSeatService,
    getAllSeatByCodeService, } = require("../services/seatService")


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
const getSeatByCodeController = async (req, res) => {
    const { code } = req.params;
    try {
        const seat = await getAllSeatByCodeService(code);
        res.status(200).send(seat)
    } catch (error) {
        res.status(500).send("error get seat by code: " + error)
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
    getSeatByCodeController,
    createSeatController,
}