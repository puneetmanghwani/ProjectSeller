import axios from 'axios'
import {
  FETCH_JOKE_REQUEST,
  FETCH_JOKE_SUCCESS,
  FETCH_JOKE_FAILURE
} from './jokeTypes'

export const fetchJoke = () => {
  return (dispatch) => {
    dispatch(fetchJokeRequest())
    axios
      .get('https://official-joke-api.appspot.com/random_joke')
      .then(response => {
        // response.data is the users
        const jokeData = response.data;
        const joke={
          setup:jokeData.setup,
          punchline:jokeData.punchline
        }
        dispatch(fetchJokeSuccess(joke))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchJokeFailure(error.message))
      })
  }
}

export const fetchJokeRequest = () => {
  return {
    type: FETCH_JOKE_REQUEST
  }
}

export const fetchJokeSuccess = joke => {
  return {
    type: FETCH_JOKE_SUCCESS,
    payload: joke
  }
}

export const fetchJokeFailure = error => {
  return {
    type: FETCH_JOKE_FAILURE,
    payload: error
  }
}