// const obj2 = {
import { GET_TOKEN, GET_TOKEN_SUCCESS } from '../action/index';
//   token: 'token retornado da api',
// };

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
    };
  case GET_TOKEN_SUCCESS:
    return action.token;
  default:
    return state;
  }
};

export default token;
