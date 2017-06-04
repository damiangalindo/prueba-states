// import _ from 'lodash'
import { FETCH_MOVIES, FETCH_MOVIE } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_MOVIE:
      console.log(action.payload.data)
      return action.payload.data;
    case FETCH_MOVIES:
      const { results } = action.payload.data;
      return results;
    default:
      return state
  }
}
