// import _ from 'lodash'
import { FETCH_MOVIES, FETCH_MOVIE, SEARCH_MOVIES } from '../actions';

export default function(
  state = {
    list: [],
    selected: {}
  }, action) {
  switch (action.type) {
    case FETCH_MOVIE:
      return Object.assign({}, state, { selected: action.payload.data } )
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
