import { GENERATE_JOKE } from './jokeTypes';

export const generateJoke = () => {
    return {
      type: GENERATE_JOKE,
    }
  }