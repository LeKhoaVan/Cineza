module.exports = (sequelize, DataTypes) => {
    const ShowTime = sequelize.define("ShowTime", {
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
        showDate: {
            type: DataTypes.DATE,
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
            modelName: "ShowTime",
            tableName: "ShowTime",
            timestamps: true,
        })
    return ShowTime;
}