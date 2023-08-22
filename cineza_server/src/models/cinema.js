const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Cinema extends Model {
        static accociate({ CinemaMovie, Seat }) {
            Cinema.hasMany(CinemaMovie, { foreignKey: "idCinema" })
            Cinema.belongsTo(Seat, { foreignKey: "idCinema" })
        }
    }
    Cinema.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            cinemaName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cinemaStatus: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [["ACTIVE", "REPAIR", "TEMPORARY_LOCKED", "", "DESTROY"]]
                }
            }

        },
        {
            sequelize,
            modelName: "Cinema",
            tableName: "Cinemas",
            timestamps: true
        }
    );
    return Cinema;
}