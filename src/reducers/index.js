import { combineReducers } from 'redux';
import MoviesReducer from './reducer_movies';
import GenresReducer from './reducer_genres';

const rootReducer = combineReducers({
  movies: MoviesReducer,
  genres: GenresReducer
});

export default rootReducer;
