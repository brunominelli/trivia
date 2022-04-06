import { GET_QUESTIONS } from '../action';

const INITIAL_STATE = {
  shuffledResults: [],
};

const shuffleResults = (results) => {
  const shuffle = 0.5;
  const final = results.map((result) => [result.correct_answer,
    ...result.incorrect_answers]
    .sort(() => Math.random() - shuffle));

  return final;
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      shuffledResults: shuffleResults(action.data.results),
    };
  default:
    return state;
  }
};

export default questions;
