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
          isIn: [["DOI", "COMUNITY", "VIP"]],
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
