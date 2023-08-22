const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Ticket extends Model {

        static accociate({ Seat, User, Movie, Bill }) {
            Ticket.belongsTo(Seat, { foreignKey: "idSeat" })
            Ticket.belongsTo(User, { foreignKey: "idUser" })
            Ticket.belongsTo(Movie, { foreignKey: "idMovie" })
            Ticket.belongsTo(Bill, { foreignKey: "idBill" })
        }
    }

    Ticket.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            idSeat: {
                type: DataTypes.UUID,
                references: {
                    model: "Seats",
                    key: "id"
                }
            },
            idUser: {
                type: DataTypes.UUID,
                references: {
                    model: "Users",
                    key: "id"
                }
            },
            idMovie: {
                type: DataTypes.UUID,
                references: {
                    model: "Movies",
                    key: "id"
                }
            },
            idBill: {
                type: DataTypes.UUID,
                references: {
                    model: "Bills",
                    key: "id"
                }
            },
            buyAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            ticketEffectiveAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            ticketExpiryAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            // ticketStatus: {
            //     type: DataTypes.STRING,
            //     allowNull: false,
            //     validate: {
            //         isIn: [["WAITING", "FINISHED", ""]]
            //     }
            // }

        },
        {
            sequelize,
            modelName: "Ticket",
            tableName: "Tickets",
            timestamps: true
        }
    )
    return Ticket
}