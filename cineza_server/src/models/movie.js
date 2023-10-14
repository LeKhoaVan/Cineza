
module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define("Movie", {
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
        movieName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        moviePoster: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        movieTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        director: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        actor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["TIENG VIET", "ANH", "TRUNG QUOC", "NHAT BAN"]]
            }
        },
        releaseTime: {
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
        },

        movieType: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "MovieType",
                key: "code",
            }
        }

    },
        {
            sequelize,
            modelName: "Movie",
            tableName: "Movie",
            timestamps: true,
        })
    return Movie;
}