import axios from 'axios';

export const FETCH_MOVIES = 'fetch_movies';
export const FETCH_MOVIE = 'fetch_movie';

const API_KEY = '?api_key=700fdd6812d76d59ed3111d7982bd90c'
const ROOT_URL = 'https://api.themoviedb.org/3';

export function fetchMovies() {
  const request = axios.get(`${ ROOT_URL }/discover/movie${ API_KEY }`);

  return {
    type: FETCH_MOVIES,
    payload: request
  }
}

export function fetchMovie(id) {
  const request = axios.get(`${ ROOT_URL }/movie/${ id }${ API_KEY }&append_to_response=casts`);

  return {
    type: FETCH_MOVIE,
    payload: request
  }
}
