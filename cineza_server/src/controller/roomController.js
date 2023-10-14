const { createRoomService, getAllRoomService, getRoomByCodeService } = require("../services/roomService")


const getAllRoomController = async (req, res) => {
    try {
        const allRoom = await getAllRoomService();
        res.status(200).send(allRoom);
    } catch (error) {
        res.status(500).send("error get all room controller: " + error);
    }
}

const getRoomByCodeController = async (req, res) => {
    const { code } = req.params;
    try {
        const room = await getRoomByCodeService(code);
        res.status(200).send(room);
    } catch (error) {
        res.status(500).send("error get room by code: " + error);
    }
}

const createRoomController = async (req, res) => {
    const { code, name, codeRap, status } = req.body;
    try {
        const newRoom = await createRoomService({ code, name, codeRap, status });
        res.status(201).send(newRoom);
    } catch (error) {
        res.status(500).send("error create a new room: " + error);
    }
}

module.exports = {
    createRoomController,
    getAllRoomController,
    getRoomByCodeController
}