const { db } = require("../models/index");
const moment = require('moment'); // require
const getAllShowService = async () => {
  const query = `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.showDate , s.showStart, s.showEnd, s.status, m.movieName as nameMovie, r.name as nameRap,  ro.name as nameRoom
        from showing as s 
        join movie as m on s.codeMovie = m.code
        join rap as r on s.codeRap = r.code
        join room as ro on s.codeRoom = ro.code`;
  const [allShow, metadata] = await db.sequelize.query(query);
  return allShow;
};

const getShowByCodeService = async (code) => {
  const query =
    `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.showDate , s.showStart, s.showEnd, s.status, m.movieName, r.name as nameRap,  ro.name as nameRoom
      from showing as s 
      join movie as m on s.codeMovie = m.code
      join rap as r on s.codeRap = r.code
      join room as ro on s.codeRoom = ro.code
      where s.code = '${code}'`
  const [showing, metadata] = await db.sequelize.query(query);
  return showing[0];
};

const getShowByMovieAndDateService = async (codeMovie, date) => {
  const query = `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.showDate, s.showStart, s.showEnd, s.status, m.movieName,
  r.name as rapName, ro.name as roomName
  from showing as s
  join movie as m on m.code = s.codeMovie
  join Rap as r on r.code = s.codeRap
  join Room as ro on ro.code = s.codeRoom
  where s.codeMovie = '${codeMovie}' and s.showDate like '${date}%';`
  const [shows, metadata] = await db.sequelize.query(query);
  return shows;
}

const getShowByRapAndDateService = async (codeRap, date) => {
  const query = `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.showDate, s.showStart, s.showEnd, s.status, m.movieName,
  r.name as rapName, ro.name as roomName
  from showing as s
  join movie as m on m.code = s.codeMovie
  join Rap as r on r.code = s.codeRap
  join Room as ro on ro.code = s.codeRoom
  where s.codeRap = '${codeRap}' and s.showDate like '${date}%';`
  const [shows, metadata] = await db.sequelize.query(query);
  return shows;
}

const getShowByRapMovieAndDateService = async (codeRap, codeMovie, date) => {
  const query = `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.showDate, s.showStart, s.showEnd, s.status, m.movieName,
  r.name as rapName, ro.name as roomName
  from showing as s
  join movie as m on m.code = s.codeMovie
  join Rap as r on r.code = s.codeRap
  join Room as ro on ro.code = s.codeRoom
  where s.codeRap = '${codeRap}' and s.codeMovie = '${codeMovie}' and s.showDate like '${date}%';`
  const [shows, metadata] = await db.sequelize.query(query);
  return shows;
}

const createShowService = async (show) => {
  const newShow = await db.Showing.create(show);
  return newShow;
};

const updateShowService = async (code, show) => {
  const updateShow = await db.Showing.update(show, {
    where: {
      code: code,
    },
  });
  return updateShow;
};

const checkShow = async (codeMovie, codeRap, codeRoom, showDate, showStart) => {
  const date = moment(showDate).format("YYYY-MM-DD HH:mm:ss");
  const start = moment(showStart).format("YYYY-MM-DD HH:mm:ss");

  const query = `select s.code from showing as s
  where s.codeMovie = '${codeMovie}' 
  and s.codeRap = '${codeRap}' 
  and s.codeRoom = '${codeRoom}' 
  and s.showDate = '${date}'
  and '${start}' >= s.showStart 
  AND '${start}' <= s.showEnd`;
  const [check, metadata] = await db.sequelize.query(query);
  return check[0];
};

const getAllShowByMovieService = async (codeMovie) => {
  const query = `select s.code, s.codeMovie, s.codeRap, s.codeRoom,  s.showDate , s.showStart, s.showEnd, s.status, m.movieName, r.name as nameRap,  ro.name as nameRoom
        from showing as s 
        join movie as m on s.codeMovie = m.code
        join rap as r on s.codeRap = r.code
        join room as ro on s.codeRoom = ro.code
        where s.codeMovie = '${codeMovie}'`;
  const [allShow, metadata] = await db.sequelize.query(query);
  return allShow;
};

const getAllShowByRapService = async (codeRap) => {
  const query = `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.showDate , s.showStart, s.showEnd, s.status, m.movieName, r.name as nameRap,  ro.name as nameRoom
     from showing as s 
     join movie as m on s.codeMovie = m.code
     join rap as r on s.codeRap = r.code
     join room as ro on s.codeRoom = ro.code
     where s.codeRap = '${codeRap}';`;
  const [allShow, metadata] = await db.sequelize.query(query);
  return allShow;
};

const getAllShowByMovieAndRapService = async (codeMovie, codeRap) => {
  const query = `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.showDate , s.showStart, s.showEnd, s.status, m.movieName, r.name as nameRap,  ro.name as nameRoom
     from showing as s 
     join movie as m on s.codeMovie = m.code
     join rap as r on s.codeRap = r.code
     join room as ro on s.codeRoom = ro.code
     where s.codeMovie = '${codeMovie}' and s.codeRap = '${codeRap}';`;
  const [allShow, metadata] = await db.sequelize.query(query);
  return allShow;
}
module.exports = {
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
  getShowByRapMovieAndDateService
};
