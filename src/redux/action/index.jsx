import { fetchTokenAPI } from '../../services/api';

export const SET_PLAYER = 'SET_PLAYER';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILURE = 'GET_TOKEN_FAILURE';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_SCORE = 'GET_SCORE';
export const SAVE_CORRECT = 'SAVE_CORRECT';

export const setPlayer = (name, gravatarEmail) => (
  { type: SET_PLAYER, name, gravatarEmail });

export const tokenAction = () => ({ type: GET_TOKEN });

export const tokenActionSuccess = (json) => (
  { type: GET_TOKEN_SUCCESS, token: json.token });

export const tokenActionFailure = (error) => ({ type: GET_TOKEN_FAILURE, error });

export function fetchApi() {
  return async (dispatch) => fetchTokenAPI()
    .then(
      (json) => dispatch(tokenActionSuccess(json)),
      (error) => dispatch(tokenActionFailure(error)),
    );
}

export const getQuestions = (data) => ({ type: GET_QUESTIONS, data });
export const getScore = (score) => ({ type: GET_SCORE, score });
export const saveCorrect = (correct) => ({ type: SAVE_CORRECT, correct });
