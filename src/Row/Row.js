import React, { useEffect, useState } from "react";
import axios from "../API/axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Details from "../Details/details";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  // use states
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movieDetail, setmovieDetail] = useState(false);
  const [textMovie, setTextMovie] = useState("");
  const [moviePoints, setMoviePoints] = useState("");
  const [movieTitle, setmovieTitle] = useState("");
  const [movieImage, setMovieImage] = useState("");
  const [actualMovieID, setActualMovieID] = useState("");

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
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    setActualMovieID(movie.id);
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
        <Details
          movieDetail={movieDetail}
          trailerUrl={trailerUrl}
          opts={opts}
          movieImage={movieImage}
          movieTitle={movieTitle}
          moviePoints={moviePoints}
          textMovie={textMovie}
          actualMovieID={actualMovieID}
          setmovieDetail={setmovieDetail}
          isRelatedDetail={false}
        />
      </div>
    </div>
  );
}

export { Row };
