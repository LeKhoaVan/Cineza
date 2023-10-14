const { Sequelize, DataTypes } = require('sequelize');

const { development, test, production } = require("../config/configDB");

const db = {};

const sequelize = new Sequelize(development.database, development.username, development.password, {
    host: development.host,
    dialect: development.dialect,

    timezone: '+07:00',
    // // hide query sql in sequelize
    logging: false
});


//test connect
// const testConnect = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.HierachyStructure = require("./hierarchyStructure")(sequelize, DataTypes);
db.ValueStructure = require("./valueStructure")(sequelize, DataTypes);
db.PromotionHeader = require("./promotionHeader")(sequelize, DataTypes);
db.PromotionLine = require("./promotionLine")(sequelize, DataTypes);
db.Movie = require("./movie")(sequelize, DataTypes);
db.MovieType = require("./movieType")(sequelize, DataTypes);
db.Rap = require("./rap")(sequelize, DataTypes);
db.Room = require("./room")(sequelize, DataTypes);

db.HierachyStructure.hasMany(db.ValueStructure, { foreignKey: "type" });
db.ValueStructure.belongsTo(db.HierachyStructure, { foreignKey: "type" });

db.ValueStructure.hasMany(db.ValueStructure, { foreignKey: "parentId" })
db.ValueStructure.belongsTo(db.ValueStructure, { foreignKey: "parentId" });

db.ValueStructure.hasMany(db.ValueStructure, { foreignKey: "countryAddress" })
db.ValueStructure.belongsTo(db.ValueStructure, { foreignKey: "countryAddress" });

db.ValueStructure.hasMany(db.ValueStructure, { foreignKey: "cityAddress" })
db.ValueStructure.belongsTo(db.ValueStructure, { foreignKey: "cityAddress" });

db.ValueStructure.hasMany(db.ValueStructure, { foreignKey: "districtAddress" })
db.ValueStructure.belongsTo(db.ValueStructure, { foreignKey: "districtAddress" });

db.ValueStructure.hasMany(db.ValueStructure, { foreignKey: "wardAddress" })
db.ValueStructure.belongsTo(db.ValueStructure, { foreignKey: "wardAddress" });

db.PromotionHeader.hasMany(db.PromotionLine, { foreignKey: "promotionHeaderCode" });
db.PromotionLine.belongsTo(db.PromotionLine, { foreignKey: "promotionHeaderCode" });

db.MovieType.hasMany(db.Movie, { foreignKey: "movieType" });
db.Movie.belongsTo(db.MovieType, { foreignKey: "movieType" });

db.ValueStructure.hasMany(db.Rap, { foreignKey: "countryAddress" });
db.Rap.belongsTo(db.ValueStructure, { foreignKey: "countryAddress" });

db.ValueStructure.hasMany(db.Rap, { foreignKey: "cityAddress" });
db.Rap.belongsTo(db.ValueStructure, { foreignKey: "cityAddress" });

db.ValueStructure.hasMany(db.Rap, { foreignKey: "districtAddress" });
db.Rap.belongsTo(db.ValueStructure, { foreignKey: "districtAddress" });

db.ValueStructure.hasMany(db.Rap, { foreignKey: "wardAddress" });
db.Rap.belongsTo(db.ValueStructure, { foreignKey: "wardAddress" });

db.Rap.hasMany(db.Room, { foreignKey: "codeRap" });
db.Room.belongsTo(db.Rap, { foreignKey: "codeRap" });


module.exports = {
    // testConnect,
    db,
    sequelize
}