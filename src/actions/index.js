import axios from 'axios';
import queryString from 'query-string';
import _ from 'lodash';

export const FETCH_MOVIES = 'fetch_movies';
export const FETCH_MOVIE = 'fetch_movie';
export const FETCH_LIST = 'fetch_list';
export const SEARCH_MOVIES = 'search_movies';
export const PREDICTIVE_MOVIE_SEARCH = 'predictive_search';

const API_KEY = '?api_key=700fdd6812d76d59ed3111d7982bd90c'
const ROOT_URL = 'https://api.themoviedb.org/3';

export function fetchMovies(filter = {}) {
  const criteria = !_.isEmpty(filter) ? `&${ queryString.stringify(filter) }` : '';

  const request = axios.get(`${ ROOT_URL }/discover/movie${ API_KEY }&page=${ 1 }${ criteria }`);

  return {
    type: FETCH_MOVIES,
    payload: request
  }
}

export function fetchMovie(id) {
  const request = axios.get(`${ ROOT_URL }/movie/${ id }${ API_KEY }&append_to_response=casts,keywords,videos`);

  return {
    type: FETCH_MOVIE,
    payload: request
  }
}

export function fetchLists() {
  const request = axios.get(`${ ROOT_URL }/genre/movie/list${ API_KEY }`);

  return {
    type: FETCH_LIST,
    payload: request
  }
}

export function searchMovies(criteria) {
  const request = axios.get(`${ ROOT_URL }/search/movie${ API_KEY }&query=${ criteria }`);

  return {
    type: SEARCH_MOVIES,
    payload: request
  }
}

export function searchForMovies(criteria) {
  const request = axios.get(`${ ROOT_URL }/search/movie${ API_KEY }&query=${ criteria }`);

  return {
    type: PREDICTIVE_MOVIE_SEARCH,
    payload: request
  }
}
