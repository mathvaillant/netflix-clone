import React, {
  useEffect,
  useState
} from 'react';

import './Row.scss';

// base url for fetching images 
const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(fetchUrl);

      const responseData = await response.json()
      setMovies(responseData.results);

      return responseData.results;
    }

    fetchData();
  }, [fetchUrl]);


  return (
    <div className='row'>
      <h2>{title}</h2>

      <div className="row__posters">
        {movies?.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={isLargeRow? `${baseUrl}${movie.poster_path}` : `${baseUrl}${movie.backdrop_path}`} 
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  )
}

export default Row;
