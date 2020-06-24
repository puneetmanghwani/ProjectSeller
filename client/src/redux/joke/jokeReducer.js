import { GENERATE_JOKE } from './jokeTypes'
import axios from "axios";

// function jokeGenerator(){
//   console.log('hello');
//     axios.get('https://official-joke-api.appspot.com/random_joke')
//     .then(joke => {
//       return joke.data;
//     });
// }
const jokeGenerator=()=>{
  return axios.get('https://official-joke-api.appspot.com/random_joke')
    .then(joke => {
      return joke.data;
    });
}



const initialState = {
    setup:"Why do trees seem suspicious on sunny days?",
    punchline:"Dunno, they're just a bit shady."
}

const jokeReducer = (state = initialState, action) => {
    switch (action.type) {
      case GENERATE_JOKE: 
      jokeGenerator()
      .then(jokeData=>{
        // console.log(state)
        // state.setup = jokeData.setup;
        // state.punchline = jokeData.punchline;
        return {
            ...state,
            setup:jokeData.setup,
            // punchline:jokeData.punchline
        }
      })
      default: return state
    }
  }
  
  export default jokeReducer


