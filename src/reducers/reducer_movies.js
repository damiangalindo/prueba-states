// import _ from 'lodash'
import { FETCH_MOVIES, FETCH_MOVIE, SEARCH_MOVIES, PREDICTIVE_MOVIE_SEARCH } from '../actions';

export default function(
  state = {
    list: [],
    selected: {},
    predicted_movies: []
  }, action) {
  switch (action.type) {
    case FETCH_MOVIE:
      return Object.assign({}, state, { selected: action.payload.data } )
    case PREDICTIVE_MOVIE_SEARCH:
      return Object.assign({}, state, { predicted_movies: action.payload.data.results })
    case SEARCH_MOVIES:
      return Object.assign({}, state, {
        list: action.payload.data.results
      })
    case FETCH_MOVIES:
      return Object.assign({}, state, {
        list: action.payload.data.results
      })
    default:
      return state
  }
}
