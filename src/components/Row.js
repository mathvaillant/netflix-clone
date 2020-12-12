import React, {
  useEffect,
  useState
} from 'react';

import './Row.scss';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

// base url for fetching images 
const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(fetchUrl);

      const responseData = await response.json()
      setMovies(responseData.results);

      return responseData.results;
    }

    fetchData();
  }, [fetchUrl]);

  // Youtube trailer options
  const opts = {
    height: "390",
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  // Handle when user clicks the video
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.original_name || movie?.name || movie?.title)
        .then((url) => {
          // https://www.youtube.com/watch?v=
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch(error => console.log(error));
    };
  };

  // Handle Row posters slider
  const handleSlider = (e) => {
    const slider = document.querySelector('.slider');
    let isDown = false
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
      // console.log(walk);
    });
  }


  return (
    <div className='row'
      onMouseDown={handleSlider}
    >
      <h2>{title}</h2>

      <div className="row__posters slider"
      >
        {movies?.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={isLargeRow ? `${baseUrl}${movie.poster_path}` : `${baseUrl}${movie.backdrop_path}`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row;
