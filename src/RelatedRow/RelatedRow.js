import React from "react";
import { useEffect, useState } from "react";
import axios from "../API/axios";
import "./RelatedRow.css";
import Details from "../Details/details";
import movieTrailer from "movie-trailer";
function RelatedRow({ id }) {
  const API_KEY = "ff33b46f2268bd3df304835ea7aba5a6";
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movieDetail, setmovieDetail] = useState(false);
  const [textMovie, setTextMovie] = useState("");
  const [moviePoints, setMoviePoints] = useState("");
  const [movieTitle, setmovieTitle] = useState("");
  const [movieImage, setMovieImage] = useState("");
  const [actualMovieID, setActualMovieID] = useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
      );
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [id]);
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
    <>
      <h2 className="row__title">Similar Movies</h2>
      <div className="row__container">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => {
              handleClick(movie);
            }}
            className="row__movies"
            src={`${base_url}${movie.poster_path}`}
            alt={movie.name}
          />
        ))}
      </div>
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
        isRelatedDetail={true}
      />
    </>
  );
}

export default RelatedRow;
