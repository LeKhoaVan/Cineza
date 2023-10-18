const { Op, where } = require("sequelize");

const { db } = require("../models/index")

const getAllMovieService = async (movieName) => {
    if (movieName) {
        const movies = await db.Movie.findAll({
            where: {
                movieName: {
                    [Op.like]: `%${movieName}%`
                }
            }
        })
        return movies;
    } else {
        const movies = await db.Movie.findAll();
        return movies
    }
}

const getByCodeService = async (movieCode) => {
    const movie = db.Movie.findOne({
        where: {
            movieCode: movieCode
        }
    })

    return movie
}

const movieCreateService = async (movie) => {
    return await db.Movie.create(movie);
}

const updateMovieService = async (movieCode, movie) => {
    const oldMovie = await db.Movie.findOne({
        where: {
            movieCode: movieCode
        }
    });

    if (oldMovie) {
        return await db.Movie.update(movie, {
            where: {
                movieCode: movieCode
            }
        })
    } else {
        return null;
    }
}

module.exports = {
    movieCreateService,
    getByCodeService,
    getAllMovieService,
    updateMovieService
}