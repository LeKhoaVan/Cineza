const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Movie extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ MovieType, MoviePrice, CinemaMovie, Ticket }) {
            // define association here
            Movie.belongsTo(MovieType, { foreignKey: "idMovieType" });
            Movie.hasMany(MoviePrice, { foreignKey: "idMovie" })
            Movie.hasMany(CinemaMovie, { foreignKey: "idMovie" })
            Movie.hasMany(Ticket, { foreignKey: "idMovie" })
        }
    }
    Movie.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },

            idMovieType: {
                type: DataTypes.UUID,
                references: {
                    model: "MovieTypes",
                    key: "id"
                }
            },

            movieCode: {
                type: DataTypes.STRING(12),
                unique: true,
                allowNull: false
            },
            movieName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            moviePoster: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            movieTime: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            director: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            actor: {
                type: DataTypes.STRING,
                allowNull: false
            },
            language: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            releaseTime: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            movieStatus: {
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
            modelName: "Movie",
            tableName: "Movies",
            timestamps: true
        }
    );
    return Movie;
}