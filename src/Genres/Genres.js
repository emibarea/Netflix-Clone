import axios from "../API/axios";
import React, { useEffect, useState } from "react";
import "./Genres.css";
function Genres({ id }) {
  const [genresM, setgenresM] = useState([]);
  const [adultMovie, setAdultMovie] = useState(false);
  const API_KEY = "ff33b46f2268bd3df304835ea7aba5a6";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      console.log(request);
      setgenresM(request.data.genres);
      setAdultMovie(request.data.adult);
      return request;
    }
    fetchData();
  }, [id]);
  return (
    <>
      {!adultMovie && (
        <img
          src="https://img.icons8.com/fluency/2x/children.png"
          className="adult__movie"
        />
      )}
      {genresM.map((genre) => (
        <p className="movie__genres">{genre.name}</p>
      ))}
    </>
  );
}

export default Genres;
