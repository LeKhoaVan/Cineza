const { Sequelize, DataTypes } = require('sequelize');

const { development, test, production } = require("../config/configDB");

const db = {};

const sequelize = new Sequelize(development.database, development.username, development.password, {
    host: development.host,
    dialect: development.dialect,

    // // hide query sql in sequelize
    logging: false
});

//test connect
const testConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.MovieType = require("./movieType.js")(sequelize, DataTypes)
db.Movie = require("./movie.js")(sequelize, DataTypes);
db.MoviePrice = require("./moviePrice.js")(sequelize, DataTypes);
db.CinemaMovie = require("./cinemaMovie.js")(sequelize, DataTypes);
db.Cinema = require("./cinema.js")(sequelize, DataTypes);
db.Seat = require("./Seat")(sequelize, DataTypes);
db.Ticket = require("./ticket.js")(sequelize, DataTypes);
db.User = require("./user.js")(sequelize, DataTypes);
db.Bill = require("./bill.js")(sequelize, DataTypes)

module.exports = {
    testConnect,
    db
}