import { fetchTokenAPI } from '../../services/api';

export const SET_PLAYER = 'SET_PLAYER';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILURE = 'GET_TOKEN_FAILURE';

export const setPlayer = (name, gravatarEmail) => (
  { type: SET_PLAYER, name, gravatarEmail });

export const tokenAction = () => ({ type: GET_TOKEN });

export const tokenActionSuccess = (json) => (
  { type: GET_TOKEN_SUCCESS, token: json.token });

export const tokenActionFailure = (error) => ({ type: GET_TOKEN_FAILURE, error });

export function fetchApi() {
  return async (dispatch) => {
    dispatch(tokenAction());
    return fetchTokenAPI()
      .then(
        (json) => dispatch(tokenActionSuccess(json)),
        (error) => dispatch(tokenActionFailure(error)),
      );
  };
}
