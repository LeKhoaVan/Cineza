const { db } = require("../models/index")

const getAllSeatService = async () => {
    const query = `select s.code, s.type, s.position, s.codeRoom, s.status , r.name as nameRoom
    from seat as s
    join room as r on r.code = s.codeRoom;`
    const [allSeat, setAllSeat] = await db.sequelize.query(query);
    return allSeat;
}

const getAllSeatByCodeRoomService = async (codeRoom) => {
    const query = `select s.code, s.type, s.position, s.codeRoom, s.status , r.name as nameRoom
    from seat as s
    join room as r on r.code = s.codeRoom
    where s.codeRoom = '${codeRoom}'`
    const [allSeat, setAllSeat] = await db.sequelize.query(query);
    return allSeat;
}

const createSeatService = async (seat) => {
    const newSeat = await db.Seat.create(seat);
    return newSeat;
}

module.exports = {
    getAllSeatService,
    getAllSeatByCodeRoomService,
    createSeatService,
}