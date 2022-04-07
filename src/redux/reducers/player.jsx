// const obj = {
//   name: 'nome-da-pessoa',
//   assertions: 'número-de-acertos',
//   score: 'pontuação',
//   gravatarEmail: 'email-da-pessoa',
// };
import { GET_SCORE, SAVE_CORRECT, SET_PLAYER } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLAYER:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    };
  case GET_SCORE:
    return {
      ...state,
      score: action.score,
    };
  case SAVE_CORRECT:
    return {
      ...state,
      assertions: state.assertions + action.correct,
    };
  default:
    return state;
  }
};

export default player;
