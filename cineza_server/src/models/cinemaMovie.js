const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class CinemaMovie extends Model {

        static accociate({ Movie, Cinema }) {
            CinemaMovie.belongsTo(Movie, { foreignKey: "idMovie" });
            CinemaMovie.belongsTo(Cinema, { foreignKey: "idCinema" });
        }
    }
    CinemaMovie.init(
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
            idCinema: {
                type: DataTypes.UUID,
                references: {
                    model: "Cinemas",
                    type: "id"
                }
            },
            screeningAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "CinemaMovie",
            tableName: "CinemaMovies",
            timestamps: true
        }
    )
    return CinemaMovie
}