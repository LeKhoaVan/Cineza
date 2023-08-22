const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Seat extends Model {

        static accociate({ Cinema, Ticket }) {
            Seat.belongsTo(Cinema, { foreignKey: "idCinema" })
            Seat.hasMany(Cinema, { foreignKey: "idSeat" })

        }
    }
    Seat.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            idCinema: {
                type: DataTypes.UUID,
                references: {
                    model: "Cinemas",
                    key: "id"
                }
            },
            position: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            seatType: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [["VIP", "REGULAR"]]
                }
            },
            seatStatus: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "EMPTY",
                validate: {
                    isIn: [["EMPTY", "BOOKED", "REPAIR"]]
                }
            }
        },
        {
            sequelize,
            modelName: "Seat",
            tableName: "Seats",
            timestamps: true
        }
    )
    return Seat
}