const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static accociate({ Ticket }) {
            User.hasMany(Ticket, { foreignKey: "idUser" })
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            numberPhone: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {

                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {

                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dateOfBirth: {
                type: DataTypes.DATE,
                allowNull: false
            },
            typeAccount: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "USER",
                validate: {
                    isIn: [["USER", "ADMIN", "SUPRER_ADMIN"]]
                }
            }
        },
        {
            sequelize,
            modelName: "User",
            tableName: "Users",
            timestamps: true
        }
    )
    return User;
}