import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import MoviesReducer from './reducer_movies';
import GenresReducer from './reducer_genres';

const rootReducer = combineReducers({
  movies: MoviesReducer,
  genres: GenresReducer,
  form: formReducer
});

export default rootReducer;
