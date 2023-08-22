const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Bill extends Model {

        static associate({ Ticket }) {
            Bill.hasMany(Ticket, { foreignKey: "idTicket" })
        }
    }
    Bill.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },

            createDate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            }
        },
        {
            sequelize,
            modelName: "Bill",
            tableName: "Bills",
            timestamps: true
        }
    )
    return Bill;
}