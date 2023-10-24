
module.exports = (sequelize, DataTypes) => {
    const Showing = sequelize.define("Showing", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        codeMovie: {
            type: DataTypes.STRING,
            references: {
                model: "Movie",
                key: "code",
            }
        },
        codeRap: {
            type: DataTypes.STRING,
            references: {
                model: "Rap",
                key: "code",
            }
        },
        codeRoom: {
            type: DataTypes.STRING,
            references: {
                model: "Room",
                key: "code",
            }
        },
        codeShowTime: {
            type: DataTypes.STRING,
            references: {
                model: "ShowTime",
                key: "code",
            }
        },
        screenAt: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "ACTIVE",
            validate: {
                isIn: [["ACTIVE", "TEMPORARY_LOCKED", "DESTROY"]]
            }
        },

    },
        {
            sequelize,
            modelName: "Showing",
            tableName: "Showing",
            timestamps: true,
        })
    return Showing;
}
