// const obj = {
//   name: 'nome-da-pessoa',
//   assertions: 'número-de-acertos',
//   score: 'pontuação',
//   gravatarEmail: 'email-da-pessoa',
// };
import { SET_PLAYER } from '../action';

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
  default:
    return state;
  }
};

export default player;