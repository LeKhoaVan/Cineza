const { db } = require("../models/index");

const getAllSeatService = async () => {
  const query = `select s.code, s.type, s.position, s.codeRoom, s.status, s.isBook , r.name as nameRoom
    from seat as s
    join room as r on r.code = s.codeRoom;`;
  const [allSeat, setAllSeat] = await db.sequelize.query(query);
  return allSeat;
};

const getAllSeatByCodeRoomService = async (codeRoom) => {
  const query = `select s.code, s.type, s.position, s.codeRoom, s.status, s.isBook , r.name as nameRoom
    from seat as s
    join room as r on r.code = s.codeRoom
    where s.codeRoom = '${codeRoom}'`;
  const [allSeat, setAllSeat] = await db.sequelize.query(query);
  return allSeat;
};

const getAllSeatByCodeService = async (code) => {
  const query = `select s.code, s.type, s.position, s.codeRoom, s.status, s.isBook , r.name as nameRoom
    from seat as s
    join room as r on r.code = s.codeRoom
    where s.code = '${code}'`;
  const [seat, setSeat] = await db.sequelize.query(query);
  return seat[0];
};

const createSeatService = async (seat) => {
  const newSeat = await db.Seat.create(seat);
  return newSeat;
};

const getValueSeatByCodeService = async (code) => {
    const valueSeat = await db.Seat.findOne({
      where: {
        code: code,
      },
    });
    return valueSeat;
  };
  
  const updateSeatService = async (code, seat) => {
    const updateSeat = await db.Seat.update(seat, {
      where: {
        code: code,
      },
    });
    return updateSeat;
  };

module.exports = {
  getAllSeatService,
  getAllSeatByCodeRoomService,
  createSeatService,
  getAllSeatByCodeService,
  getValueSeatByCodeService,
  updateSeatService
};
