const { db } = require("../models/index");
const { getByCodeService } = require("./movieService");
const { getShowByCodeService } = require("./showingService");

const getAllTicketService = async () => {
  const query = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, 
        r.name as rapName, ro.name as roomName, sh.showDate, s.screenAt, m.code as movieCode, m.movieName, se.position
    from ticket as t
    join showing as s on t.codeShowing = s.code
    join seat as se on t.codeSeat = se.code
    join movie as m on s.codeMovie = m.code
    join rap as r on s.codeRap = r.code
    join room as ro on s.codeRoom = ro.code
    join showtime as sh on s.codeShowTime = sh.code;`;
  const [allTicket, metadata] = await db.sequelize.query(query);
  return allTicket;
};

const getTicketByCodeService = async (code) => {
  const query = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, 
        r.name as rapName, ro.name as roomName, sh.showDate, s.screenAt, m.code as movieCode, m.movieName
    from ticket as t
    join showing as s on t.codeShowing = s.code
    join seat as se on t.codeSeat = se.code
    join movie as m on s.codeMovie = m.code
    join rap as r on s.codeRap = r.code
    join room as ro on s.codeRoom = ro.code
    join showtime as sh on s.codeShowTime = sh.code
    where t.code = '${code}'`;
  const [ticket, metadata] = await db.sequelize.query(query);
  return ticket[0];
};

const getTicketByShowingService = async (codeShowing) => {
  const query = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, 
        r.name as rapName, ro.name as roomName, sh.showDate, s.screenAt, m.code as movieCode, m.movieName
        from ticket as t
        join showing as s on t.codeShowing = s.code
        join seat as se on t.codeSeat = se.code
        join movie as m on s.codeMovie = m.code
        join rap as r on s.codeRap = r.code
        join room as ro on s.codeRoom = ro.code
        join showtime as sh on s.codeShowTime = sh.code
        where t.codeShowing = '${codeShowing}'`;
  const [ticket, metadata] = await db.sequelize.query(query);
  return ticket;
};

const checkSeatBook = async (codeSeat, codeShowing) => {
  const query = `select t.id from ticket as t where t.codeSeat = '${codeSeat}' and t.codeShowing = '${codeShowing}';`;
  const [check, metadata] = await db.sequelize.query(query);
  return check[0];
};

const createTicketService = async (ticket) => {
  // get showing => ticketEffecticeAt, ticketExpiryAt
  const showing = await getShowByCodeService(ticket.codeShowing);
  const effectDay = showing.showDate;

  const arrTime = showing.screenAt.split(":");
  if (arrTime.length > 2) {
    effectDay.setHours(arrTime[0], arrTime[1], arrTime[2], 0);
    ticket.ticketEffecticeAt = effectDay.toISOString();
  }

  //get movie => cat chuoi lay so => movieTime
  const movie = await getByCodeService(showing.codeMovie);
  const timeMovie = parseFloat(movie.movieTime);
  const hours = Math.floor(timeMovie);
  const minutes = Math.floor((timeMovie - hours) * 60);
  const seconds = Math.floor(((timeMovie - hours) * 60 - minutes) * 60);

  effectDay.setUTCHours(effectDay.getUTCHours() + hours);
  effectDay.setUTCMinutes(effectDay.getUTCMinutes() + minutes);
  effectDay.setUTCSeconds(effectDay.getUTCSeconds() + seconds);
  ticket.ticketExpiryAt = effectDay;
  ticket.bookAt = new Date();

  const newTicket = await db.Ticket.create(ticket);
  return newTicket;
};

const getAllSeatIsBookService = async (codeShowing) => {
  const query = `select t.codeSeat
    from ticket as t
    where t.codeShowing = '${codeShowing}'`;
  const [seats, metadata] = await db.sequelize.query(query);
  return seats;
};

const updateTicketStructerService = async (code, status) => {
  const updateTicket = await db.Ticket.update(
    { status },
    {
      where: {
        code: code,
      },
    }
  );
  return updateTicket;
};

module.exports = {
  getAllTicketService,
  getTicketByCodeService,
  getTicketByShowingService,
  createTicketService,
  checkSeatBook,
  getAllSeatIsBookService,
  updateTicketStructerService,
};
