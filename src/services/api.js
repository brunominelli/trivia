const TOKEN_BASE_URL = 'https://opentdb.com/api_token.php?command=request';
const TRIVIA_BASE_URL = 'https://opentdb.com/api.php?amount=5&token=';

export const fetchTokenAPI = () => (
  fetch(TOKEN_BASE_URL)
    .then((response) => (
      response.body()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const fetchTriviaAPI = (playerToken) => (
  fetch(`${TRIVIA_BASE_URL}${playerToken}`)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);
