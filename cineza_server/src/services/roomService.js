
const { db } = require("../models/index")

const getAllRoomService = async () => {
    const query = `select ro.code, ro.name, ro.codeRap, ro.status, r.name as nameRap from room as ro
        join rap as r on ro.codeRap = r.code;`

    const [allRoom, metadata] = await db.sequelize.query(query);
    return allRoom;
}
const getAllRoomByRapCodeService = async (codeRap) => {
    const query = `select ro.code, ro.name, ro.codeRap, ro.status, r.name as nameRap from room as ro
        join rap as r on ro.codeRap = r.code
        where ro.codeRap = '${codeRap}'`

    const [allRoom, metadata] = await db.sequelize.query(query);
    return allRoom;
}
const getRoomByCodeService = async (code) => {
    const query = `select ro.code, ro.name, ro.codeRap, ro.status, r.name as nameRap from room as ro
    join rap as r on ro.codeRap = r.code
    where ro.code = '${code}'`;
    const [room, metadata] = await db.sequelize.query(query);
    return room[0];
}
const createRoomService = async (room) => {
    const newRoom = await db.Room.create(room);
    return newRoom;
}

module.exports = {
    createRoomService,
    getAllRoomService,
    getRoomByCodeService,
    getAllRoomByRapCodeService,
}