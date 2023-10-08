
module.exports = (sequelize, DataTypes) => {
    const ValueStructure = sequelize.define("ValueStructure", {
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
        type: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "HierachyStructure",
                key: "id",
            }
        },
        parentId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "ValueStructure",
                key: "id"
            }
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["ADMIN", "USER", "COMUNITY", "VIP", "NUOC", "BAP", "QUOCGIA", "TINH/TP", "HUYEN/QUAN", "XA/PHUONG"]]
            }
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
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "ValueStructure",
                key: "id"
            }
        },
        cityAddress: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "ValueStructure",
                key: "id"
            }
        },
        districtAddress: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "ValueStructure",
                key: "id"
            }
        },
        wardAddress: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "ValueStructure",
                key: "id"
            }
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
            defaultValue: "ACTIVE",
            validate: {
                isIn: [["ACTIVE", "TEMPORARY_LOCKED", "DESTROY"]]
            }
        }
    },
        {
            sequelize,
            modelName: "ValueStructure",
            tableName: "ValueStructure",
            timestamps: true,
        })
    return ValueStructure;
}