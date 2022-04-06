import { GET_TOKEN_SUCCESS } from '../action/index';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN_SUCCESS:
    return action.token;
  default:
    return state;
  }
};

export default token;
