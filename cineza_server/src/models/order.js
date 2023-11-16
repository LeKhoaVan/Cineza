module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "Order",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            code: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                unique: true,
            },
            datePay: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            codeUser: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: "ValueStructure",
                    key: "code"
                }
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
            modelName: "Order",
            tableName: "Order",
            timestamps: true,
        }
    );
    return Order;
};
