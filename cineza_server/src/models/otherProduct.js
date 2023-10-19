module.exports = (sequelize, DataTypes) => {
  const OtherProduct = sequelize.define(
    "OtherProduct",
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "OtherProduct",
      tableName: "OtherProduct",
      timestamps: true,
    }
  );
  return OtherProduct;
};
