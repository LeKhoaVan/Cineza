module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define(
    "Price",
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
      value: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["COMUNITY", "VIP"]],
        },
      },
      codeMovie: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Movie",
          key: "code",
        },
      },
      codeHeader: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "PriceHeader",
          key: "code",
        },
      },
    },
    {
      sequelize,
      modelName: "Price",
      tableName: "Price",
      timestamps: true,
    }
  );
  return Price;
};
