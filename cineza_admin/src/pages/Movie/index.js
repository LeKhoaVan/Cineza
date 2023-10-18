import React, { useState } from 'react';
import MovieDetail from '../MovieDetail';
import "./movie.css"

const movieData = [
    {
        id: 1,
        title: 'Bộ phim 1',
        releaseDate: '2023-09-01',
        director: 'Đạo diễn A',
        actors: 'Diễn viên 1, Diễn viên 2,Diễn viên 1, Diễn viên 2,Diễn viên 1, Diễn viên 2,Diễn viên 1, Diễn viên 2',
        status: 'Đang chiếu',
        image: 'https://media.ngoisao.vn/resize_580/news/2011/3/31/20/Harry-Potter-tung-poster-doi-dau-day-an-tuong-0.jpg',
    },
    {
        id: 2,
        title: 'Bộ phim 2',
        releaseDate: '2023-09-15',
        director: 'Đạo diễn B',
        actors: 'Diễn viên 3, Diễn viên 4',
        status: 'Sắp chiếu',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc1hqPFfQPGyZNCRjxfXGXO8IKbtXigd52gEYn53EsQ_9ugD3odZArelSyktYBWu3kTcs&usqp=CAU',
    },
    {
        id: 1,
        title: 'Bộ phim 1',
        releaseDate: '2023-09-01',
        director: 'Đạo diễn A',
        actors: 'Diễn viên 1, Diễn viên 2',
        status: 'Đang chiếu',
        image: 'https://media.ngoisao.vn/resize_580/news/2011/3/31/20/Harry-Potter-tung-poster-doi-dau-day-an-tuong-0.jpg',
    },
    {
        id: 2,
        title: 'Bộ phim 2',
        releaseDate: '2023-09-15',
        director: 'Đạo diễn B',
        actors: 'Diễn viên 3, Diễn viên 4',
        status: 'Sắp chiếu',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc1hqPFfQPGyZNCRjxfXGXO8IKbtXigd52gEYn53EsQ_9ugD3odZArelSyktYBWu3kTcs&usqp=CAU',
    },
    {
        id: 1,
        title: 'Bộ phim 1',
        releaseDate: '2023-09-01',
        director: 'Đạo diễn A',
        actors: 'Diễn viên 1, Diễn viên 2',
        status: 'Đang chiếu',
        image: 'https://media.ngoisao.vn/resize_580/news/2011/3/31/20/Harry-Potter-tung-poster-doi-dau-day-an-tuong-0.jpg',
    },
    {
        id: 2,
        title: 'Bộ phim 2',
        releaseDate: '2023-09-15',
        director: 'Đạo diễn B',
        actors: 'Diễn viên 3, Diễn viên 4',
        status: 'Sắp chiếu',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc1hqPFfQPGyZNCRjxfXGXO8IKbtXigd52gEYn53EsQ_9ugD3odZArelSyktYBWu3kTcs&usqp=CAU',
    },
    // Thêm các bộ phim khác ở đây
];

const Movie = () => {
    const [openDetail, setOpenDetail] = useState(false)
    const handleOnClick = (movie) => {
        console.log(movie)
        setOpenDetail(true);
    }
    const handleOnClickCloseP = () => {
        window.location.href = "/cineza/admin/movie"
        setOpenDetail(false);
    }
    return (
        <div className='movie-container'>
            <div className='movie-header'>

            </div>
            <div className="movie-list">
                {movieData.map((movie, index) => (
                    <div className="movie-card" key={movie.id} onClick={() => handleOnClick(movie)}>
                        <img src={movie.image} alt={movie.title} />
                        <div className="movie-details">
                            <h2>{movie.title}</h2>
                            <p>Ngày ra mắt: {movie.releaseDate}</p>
                            <p>Đạo diễn: {movie.director}</p>
                            <p>Diễn viên: {movie.actors}</p>
                            <p>Trạng thái: {movie.status}</p>
                        </div>
                    </div>
                ))}
            </div>
            {openDetail && <MovieDetail onClickHandleClose={handleOnClickCloseP} />}
        </div>
    );
}

export default Movie;