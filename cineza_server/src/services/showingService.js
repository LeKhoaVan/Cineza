const { db } = require("../models/index")

const getAllShowService = async () => {
    const allShow = await db.Showing.findAll();
    return allShow;
}

const createShowService = async (show) => {
    const newShow = await db.Showing.create(show);
    return newShow;
}

const checkShow = async (screenAt, codeRap, codeRoom, codeShowTime) => {
    const query =
        `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.codeShowTime, s.screenAt, s.status 
        from showing as s
        where s.screenAt = '${screenAt}' and s.codeRap = '${codeRap}'and s.codeRoom = '${codeRoom}' and  s.codeShowTime = '${codeShowTime}';`
    const [check, metadata] = await db.sequelize.query(query);
    return check[0];
}

const getAllShowByMovieService = async (codeMovie) => {
    const query =
        `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.codeShowTime, s.screenAt, s.status, m.movieName, r.name as nameRap,  ro.name as nameRoom, sh.showDate
        from showing as s 
        join movie as m on s.codeMovie = m.code
        join rap as r on s.codeRap = r.code
        join room as ro on s.codeRoom = ro.code
        join showtime as sh on s.codeShowTime = sh.code
        where s.codeMovie = '${codeMovie}'`;
    const [allShow, metadata] = await db.sequelize.query(query);
    return allShow
}

const getAllShowByRapService = async (codeRap) => {
    const query =
        `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.codeShowTime, s.screenAt, s.status, m.movieName, r.name as nameRap,  ro.name as nameRoom, sh.showDate
     from showing as s 
     join movie as m on s.codeMovie = m.code
     join rap as r on s.codeRap = r.code
     join room as ro on s.codeRoom = ro.code
     join showtime as sh on s.codeShowTime = sh.code
     where s.codeRap = '${codeRap}';`
    const [allShow, metadata] = await db.sequelize.query(query);
    return allShow
}

module.exports = {
    getAllShowService,
    createShowService,
    getAllShowByMovieService,
    getAllShowByRapService,
    checkShow,
}