import React, { useEffect, useState } from 'react';
import './Banner.scss';

import requests from '../requests';

// base url for fetching images 
const baseUrl = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(requests.fetchNetflixOriginals)
      
      const responseData = await response.json();

      // Get a random number ==> Math.floor(Math.random() * responseData.results.length - 1 
      const data = responseData.results[Math.floor(Math.random() * responseData.results.length - 1)];

      setMovie(data);

      return data;
    }

    // call the async function
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("${baseUrl}${movie?.backdrop_path}")`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner__contents">
        <h1 className='banner__title'>
          {movie?.original_name || movie?.name || movie?.title}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">MyList</button>
        </div>
        <h1 className="banner__desc">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  )
}

export default Banner;
