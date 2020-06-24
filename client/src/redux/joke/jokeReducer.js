import {
  FETCH_JOKE_REQUEST,
  FETCH_JOKE_SUCCESS,
  FETCH_JOKE_FAILURE
} from './jokeTypes'

const initialState = {
  loading: false,
  joke: {},
  error: ''
}

const jokeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOKE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_JOKE_SUCCESS:
      return {
        loading: false,
        joke: action.payload,
        error: ''
      }
    case FETCH_JOKE_FAILURE:
      return {
        loading: false,
        joke: {},
        error: action.payload
      }
    default: return state
  }
}

export default jokeReducer