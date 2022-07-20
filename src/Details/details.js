import React from "react";
import RelatedRow from "../RelatedRow/RelatedRow";
import YouTube from "react-youtube";
import "./Details.css";
import Genres from "../Genres/Genres";
function Details({
  movieDetail,
  trailerUrl,
  opts,
  movieImage,
  movieTitle,
  moviePoints,
  textMovie,
  actualMovieID,
  setmovieDetail,
  isRelatedDetail,
}) {
  const base_url = "https://image.tmdb.org/t/p/original/";
  return (
    <div
      className={`${movieDetail && "movie__details__container"} ${
        movieDetail && isRelatedDetail && "related__container"
      }`}
    >
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
          <div className="movie__details__text__container">
            <h2>
              {" "}
              {movieTitle}{" "}
              {movieDetail && (
                <button
                  className={`${movieDetail && "movie__details__button"}`}
                  onClick={() => setmovieDetail(false)}
                >
                  X
                </button>
              )}{" "}
            </h2>
            <span className="movie__details__points">
              {moviePoints}
              {movieDetail && <Genres id={actualMovieID} />}
            </span>
            <p className="movies__details__text">{textMovie}</p>
          </div>
        )}
        {movieDetail && <RelatedRow id={actualMovieID} />}
      </div>
    </div>
  );
}

export default Details;
