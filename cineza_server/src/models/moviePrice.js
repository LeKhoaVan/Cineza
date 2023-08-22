const { Model, UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class MoviePrice extends Model {

        static accociate({ Movie }) {
            MoviePrice.belongsTo(Movie, { foreignKey: "idMovie" });
        }
    }
    MoviePrice.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            idMovie: {
                type: DataTypes.UUID,
                references: {
                    model: "Movies",
                    key: "id"
                }
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            priceAt: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: Date.now()
            },
            priceType: {
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
            modelName: "MoviePrice",
            tableName: "MoviePrices",
            timestamps: true
        }
    )
    return MoviePrice
}