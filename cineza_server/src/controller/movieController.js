
// const { movieCreateService, getAllMovieService, getByCodeService, updateMovieService } = require("../services/movieService")

// const getAllMovie = async (req, res) => {
//     const { movieName } = req.query;
//     try {
//         const movies = await getAllMovieService(movieName)
//         res.status(200).send(movies)
//     } catch (error) {
//         res.status(500).send("error controller get all: ", error);
//     }
// }

// const getByCodeMovie = async (req, res) => {
//     const { movieCode } = req.params;
//     try {
//         const movie = await getByCodeService(movieCode);
//         if (movie) {
//             res.status(200).send(movie)
//         } else {
//             res.status(401).send("not found!")
//         }
//     } catch (error) {
//         res.status(500).send("error cotroller get by code: ", error);
//     }
// }

// const createMovie = async (req, res) => {
//     const {
//         movieCode, movieName, moviePoster, movieTime,
//         description, director, actor, language,
//         releaseTime, movieStatus } = req.body;
//     try {
//         const newMovie = await movieCreateService({
//             movieCode, movieName, moviePoster, movieTime,
//             description, director, actor, language,
//             releaseTime, movieStatus
//         })
//         res.status(201).send(newMovie);
//     } catch (error) {
//         res.status(500).send("error controller create a new movie: " + error);
//     }
// }

// const updateMovie = async (req, res) => {
//     const { movieCode } = req.params;
//     const {
//         movieName, moviePoster, movieTime,
//         description, director, actor, language,
//         releaseTime, movieStatus } = req.body;
//     try {
//         const updateMovie = await updateMovieService(movieCode, {
//             movieName, moviePoster, movieTime,
//             description, director, actor, language,
//             releaseTime, movieStatus
//         })
//         res.status(200).send(updateMovie);
//     } catch (error) {
//         res.status(500).send("error update movie: " + error)
//     }
// }

// const updateStatusMovie = async (req, res) => {
//     const { movieCode } = req.params;
//     const { movieStatus } = req.body;
//     try {
//         const updateMovie = await updateMovieService(movieCode, { movieStatus })
//         res.status(200).send(updateMovie);
//     } catch (error) {
//         res.status(500).send("error update movie: " + error)
//     }

// }

// module.exports = {
//     createMovie,
//     getAllMovie,
//     getByCodeMovie,
//     updateMovie,
//     updateStatusMovie
// }