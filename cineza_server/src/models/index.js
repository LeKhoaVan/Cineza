const { Sequelize, DataTypes } = require("sequelize");

const { development, test, production } = require("../config/configDB");

const db = {};

const sequelize = new Sequelize(
  development.database,
  development.username,
  development.password,
  {
    host: development.host,
    dialect: development.dialect,

    timezone: "+07:00",
    // // hide query sql in sequelize
    logging: false,
  }
);

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
db.PromotionDetail = require("./promotionDetail")(sequelize, DataTypes);
db.Movie = require("./movie")(sequelize, DataTypes);
db.MovieType = require("./movieType")(sequelize, DataTypes);
db.Rap = require("./rap")(sequelize, DataTypes);
db.Room = require("./room")(sequelize, DataTypes);
db.Seat = require("./seat")(sequelize, DataTypes);
db.OtherProduct = require("./otherProduct")(sequelize, DataTypes);
db.PriceHeader = require("./priceHeader")(sequelize, DataTypes);
db.Price = require("./price")(sequelize, DataTypes);
db.TypeSeat = require("./typeSeat")(sequelize, DataTypes);
db.Show = require("./show")(sequelize, DataTypes);
db.ShowTime = require("./showTime")(sequelize, DataTypes)

db.HierachyStructure.hasMany(db.ValueStructure, { foreignKey: "type" });
db.ValueStructure.belongsTo(db.HierachyStructure, { foreignKey: "type" });

db.ValueStructure.hasMany(db.ValueStructure, { foreignKey: "parentId" });
db.ValueStructure.belongsTo(db.ValueStructure, { foreignKey: "parentId" });

db.ValueStructure.hasMany(db.ValueStructure, { foreignKey: "countryAddress" });
db.ValueStructure.belongsTo(db.ValueStructure, { foreignKey: "countryAddress" });

db.ValueStructure.hasMany(db.ValueStructure, { foreignKey: "cityAddress" });
db.ValueStructure.belongsTo(db.ValueStructure, { foreignKey: "cityAddress" });

db.ValueStructure.hasMany(db.ValueStructure, { foreignKey: "districtAddress" });
db.ValueStructure.belongsTo(db.ValueStructure, { foreignKey: "districtAddress" });

db.ValueStructure.hasMany(db.ValueStructure, { foreignKey: "wardAddress" });
db.ValueStructure.belongsTo(db.ValueStructure, { foreignKey: "wardAddress" });


db.PromotionHeader.hasMany(db.PromotionLine, { foreignKey: "promotionHeaderCode" });
db.PromotionLine.belongsTo(db.PromotionHeader, { foreignKey: "promotionHeaderCode" });

db.PromotionLine.hasMany(db.PromotionDetail, { foreignKey: "promotionLineCode" });
db.PromotionDetail.belongsTo(db.PromotionLine, { foreignKey: "promotionLineCode" });

db.Movie.hasMany(db.PromotionDetail, { foreignKey: "movieCode" });
db.PromotionDetail.belongsTo(db.Movie, { foreignKey: "movieCode" });

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

db.Room.hasMany(db.Seat, { foreignKey: "codeRoom" });
db.Seat.belongsTo(db.Room, { foreignKey: "codeRoom" });

db.TypeSeat.hasMany(db.Price, { foreignKey: "codeTypeSeat" });
db.Price.belongsTo(db.TypeSeat, { foreignKey: "codeTypeSeat" });

db.TypeSeat.hasMany(db.Seat, { foreignKey: "codeTypeSeat" });
db.Seat.belongsTo(db.TypeSeat, { foreignKey: "codeTypeSeat" });

db.ShowTime.hasMany(db.Show, { foreignKey: "codeShowTime" });
db.Show.belongsTo(db.ShowTime, { foreignKey: "codeShowTime" });

db.Movie.hasMany(db.Show, { foreignKey: "codeMovie" });
db.Show.belongsTo(db.Movie, { foreignKey: "codeMovie" });

db.Rap.hasMany(db.Show, { foreignKey: "codeRap" });
db.Show.belongsTo(db.Rap, { foreignKey: "codeRap" });

db.Room.hasMany(db.Show, { foreignKey: "codeRoom" });
db.Show.belongsTo(db.Room, { foreignKey: "codeRoom" });

module.exports = {
  // testConnect,
  db,
  sequelize,
};
