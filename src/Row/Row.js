import React, { useEffect, useState } from "react";
import axios from "../API/axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";
const API_KEY = "ff33b46f2268bd3df304835ea7aba5a6";

function Row({ title, fetchUrl, isLargeRow }) {
  // use states
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movieDetail, setmovieDetail] = useState(false);
  const [textMovie, setTextMovie] = useState("");
  const [moviePoints, setMoviePoints] = useState("");
  const [movieTitle, setmovieTitle] = useState("");
  const [movieImage, setMovieImage] = useState("");
  const [actualMovie, setActualMovie] = useState("");

  // use efect
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "400px",
    width: "400px",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    setActualMovie(movie);
    setmovieDetail(!movieDetail);
    setTextMovie(movie.overview);
    setMoviePoints(movie.vote_average);
    setMovieImage(movie.poster_path);
    setmovieTitle(
      movie?.original_title ||
        movie?.title ||
        movie?.original_name ||
        movie?.name
    );
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movie?.title ||
          movie?.name ||
          movie?.original_title ||
          movie?.original_name ||
          ""
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => {
              handleClick(movie);
            }}
            className={`row__poster ${isLargeRow && "row__posterLarge"} ${
              trailerUrl && "movie__trailer"
            }`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      <div className={movieDetail && "movie__details__container"}>
        <div className="movie__details">
          {trailerUrl && movieDetail && (
            <YouTube
              className="movie__details__video"
              videoId={trailerUrl}
              opts={opts}
            />
          )}
          {!trailerUrl && movieDetail && (
            <img
              src={`${base_url}${movieImage}`}
              className="movie__details__image"
            />
          )}
          {movieDetail && (
            <button
              className={`${
                movieDetail && !trailerUrl && "movie__details__button1"
              } ${movieDetail && trailerUrl && "movie__details__button"}`}
              onClick={() => setmovieDetail(false)}
            >
              X
            </button>
          )}
          {movieDetail && (
            <div className="movie__details__text__container">
              <h2> {movieTitle} </h2>
              <span className="movie__details__points">{moviePoints}</span>
              <p className="movies__details__text">{textMovie}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { Row };
