// tmdbKey is now imported from config.js
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  //variable declaration
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}&language=en-US`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  //using try...catch to handle errors
  try { 
    const response = await fetch(urlToFetch,
    {
      method: 'GET'
    });
    if(response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
  } catch(error) {
    console.log(error);
  }
};

const getMovies = async () => {
    //variable declaration
    const selectedGenre = getSelectedGenre();
    discoverMovieEndpoint = '/discover/movie';
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&language=en-US`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
    //try...catch block for control errors
    try{
        const response = await fetch(urlToFetch, {method:'GET'});
        if(response.ok){
            const jsonResponse = await response.json();
            const movies = jsonResponse.results;
            return movies;
        }
    } catch(error) {
        console.log(error);
    }
};

const getMovieInfo = async (movie) => {
    //variable declaration
    const movieId = movie.id;
    const movieEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}&langauage=en-US`;
    const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
    //try...catch block to error handling
    try{
        const response = await fetch(urlToFetch, {method: 'GET'});
        if(response.ok) {
            const movieInfo = await response.json();
            return movieInfo;
        }
    }catch(error){
        console.log(error);
    }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = await getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;