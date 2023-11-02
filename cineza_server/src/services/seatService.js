const { db } = require("../models/index");

const getAllSeatService = async () => {
  const query = `select s.code, s.codeTypeSeat, s.position, s.codeRoom, s.status, s.isBook , r.name as nameRoom, ts.type as typeSeat
    from seat as s
    join room as r on r.code = s.codeRoom
    join typeSeat as ts on ts.code = s.codeTypeSeat;`;
  const [allSeat, setAllSeat] = await db.sequelize.query(query);
  return allSeat;
};

const getAllSeatByCodeRoomService = async (codeRoom) => {
  const query = `select s.code, s.codeTypeSeat, s.position, s.codeRoom, s.status, s.isBook , r.name as nameRoom, ts.type as typeSeat
  from seat as s
  join room as r on r.code = s.codeRoom
  join typeSeat as ts on ts.code = s.codeTypeSeat
    where s.codeRoom = '${codeRoom}'`;
  const [allSeat, setAllSeat] = await db.sequelize.query(query);
  return allSeat;
};

const getAllSeatByCodeRoomAndCodeTypeService = async (codeRoom, codeType) => {
  const query = `select s.code, s.codeTypeSeat, s.position, s.codeRoom, s.status, s.isBook , r.name as nameRoom, ts.type as typeSeat
  from seat as s
  join room as r on r.code = s.codeRoom
  join typeSeat as ts on ts.code = s.codeTypeSeat
    where s.codeRoom = '${codeRoom}' and s.codeTypeSeat = '${codeType}'`;
  const [allSeat, setAllSeat] = await db.sequelize.query(query);
  return allSeat;
};

const getAllSeatByCodeService = async (code) => {
  const query = `select s.code, s.codeTypeSeat, s.position, s.codeRoom, s.status, s.isBook , r.name as nameRoom, ts.type as typeSeat
  from seat as s
  join room as r on r.code = s.codeRoom
  join typeSeat as ts on ts.code = s.codeTypeSeat
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
  getAllSeatByCodeRoomAndCodeTypeService,
  createSeatService,
  getAllSeatByCodeService,
  getValueSeatByCodeService,
  updateSeatService,
};
