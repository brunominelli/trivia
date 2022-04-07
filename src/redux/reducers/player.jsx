// const obj = {
//   name: 'nome-da-pessoa',
//   assertions: 'número-de-acertos',
//   score: 'pontuação',
//   gravatarEmail: 'email-da-pessoa',
// };
import { GET_SCORE, SET_PLAYER } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: '',
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
  default:
    return state;
  }
};

export default player;
