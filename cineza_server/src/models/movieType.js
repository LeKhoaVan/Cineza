const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class MovieType extends Model {

        static associate({ Movie }) {
            // define association here
            MovieType.hasMany(Movie, { foreignKey: "idMovieType" });
        }
    }

    MovieType.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            typeName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: "MovieType",
            tableName: "MovieTypes",
            timestamps: true
        }
    );
    return MovieType;
}