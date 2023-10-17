module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define(
    "Seat",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["SWEET", "COMUNITY", "VIP"]],
        },
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      codeRoom: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Room",
          key: "code",
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "ACTIVE",
        validate: {
          isIn: [["ACTIVE", "TEMPORARY_LOCKED", "DESTROY"]],
        },
      },
      isBook: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "NOTSELECTED",
        validate: {
          isIn: [["SELECTED", "NOTSELECTED"]],
        },
      },
    },
    {
      sequelize,
      modelName: "Seat",
      tableName: "Seat",
      timestamps: true,
    }
  );
  return Seat;
};
