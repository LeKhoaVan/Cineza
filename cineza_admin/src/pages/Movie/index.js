import React, { useEffect, useState } from 'react';
import MovieDetail from '../MovieDetail';
import axios from "axios";
import iconFind from "../../assets/imageButtons/iconFind.png";
import iconAdd from "../../assets/imageButtons/iconAdd.png"
import "./movie.css"

const Movie = () => {
    const [openDetail, setOpenDetail] = useState(false)
    const [movie, setMovie] = useState("");
    const [movieData, setMovieData] = useState([]);
    const [search, setSearch] = useState("");

    const [openDetailAdd, setOpenDetailAdd] = useState(false);

    const handleOnClick = (movie) => {
        console.log(movie)
        setMovie(movie);
        setOpenDetail(true);
    }
    const handleOnClickCloseP = () => {
        window.location.href = "/cineza/admin/movie"
        setOpenDetail(false);
    }
    const handleOnClickAdd = () => {
        setOpenDetailAdd(true);
    }

    const onChangeHandleFind = (text) => {
        setSearch(text.target.value);
    }

    useEffect(() => {
        const findMovie = async () => {
            const movies = await axios.get(`http://localhost:9000/cineza/api/v1/movie/get-all?movieName=${search}`);
            if (movies.status === 200) {
                setMovieData(movies.data)
            } else {
                console.error("error get movie :")
            }
        }
        findMovie();
    }, search)

    useEffect(() => {
        const getAllMovie = async () => {

            const allMovie = await axios.get(`http://localhost:9000/cineza/api/v1/movie/get-all`);
            if (allMovie.status == 200) {
                setMovieData(allMovie.data)
            } else {
                console.log("error get all movie")
            }
        };
        getAllMovie();
    }, [])

    return (
        <div className='movie-container'>
            <div className='movie-header'>
                <div className='movie-header-find'>
                    <input className='movie-input-find' onChange={onChangeHandleFind} />
                    <img className="movie-button-img" src={iconFind} alt='tìm kiếm' />
                </div>
                <div className='movie-header-add' onClick={handleOnClickAdd}>
                    <img className='movie-button-add' src={iconAdd} alt='thêm' />
                </div>
            </div>
            <div className="movie-list">
                {movieData.map((movie, index) => (
                    <div className="movie-card" key={movie.id} onClick={() => handleOnClick(movie)}>
                        <img className='movie-poster' src={movie.moviePoster} alt={movie.title} />
                        <div className="movie-details">
                            <h2>{movie.code} - {movie.movieName}</h2>
                            <p>Ngày ra mắt: {movie.releaseTime}</p>
                            <p>Đạo diễn: {movie.director}</p>
                            <p>Diễn viên: {movie.actor}</p>
                            <p>Trạng thái: {movie.status}</p>
                        </div>
                    </div>
                ))}
            </div>
            {openDetail && <MovieDetail onClickHandleClose={handleOnClickCloseP} movieClick={movie} />}

            {openDetailAdd && <MovieDetail onClickHandleClose={handleOnClickCloseP} addBtn={true} />}
        </div>
    );
}

export default Movie;