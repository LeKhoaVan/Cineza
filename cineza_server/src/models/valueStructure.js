module.exports = (sequelize, DataTypes) => {
  const ValueStructure = sequelize.define(
    "ValueStructure",
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
        references: {
          model: "HierachyStructure",
          key: "code",
        },
      },
      parentId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "ValueStructure",
          key: "code",
        },
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [
            [
              "ADMIN",
              "USER",
              "COMUNITY",
              "VIP",
              "NUOC",
              "BAP",
              "QUOCGIA",
              "TINH/TP",
              "HUYEN/QUAN",
              "XA/PHUONG",
            ],
          ],
        },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      numberPhone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      countryAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "ValueStructure",
          key: "code",
        },
      },
      cityAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "ValueStructure",
          key: "code",
        },
      },
      districtAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "ValueStructure",
          key: "code",
        },
      },
      wardAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "ValueStructure",
          key: "code",
        },
      },
      numberHome: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      buyAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ticketEffecticeAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ticketEffecticeAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Hoạt động",
        validate: {
          isIn: [["Hoạt động", "Khóa tạm thời", "Hủy"]],
        },
      },
    },
    {
      sequelize,
      modelName: "ValueStructure",
      tableName: "ValueStructure",
      timestamps: true,
    }
  );
  return ValueStructure;
};
