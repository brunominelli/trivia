const TOKEN_BASE_URL = 'https://opentdb.com/api_token.php?command=request';
const TRIVIA_BASE_URL = 'https://opentdb.com/api.php?amount=5&token=';

export const fetchTokenAPI = async () => {
  const response = await fetch(TOKEN_BASE_URL);
  const data = await response.json();
  return data;
};

export const fetchTriviaAPI = async (playerToken) => {
  const response = await fetch(`${TRIVIA_BASE_URL}${playerToken}`);
  const data = await response.json();
  return data;
};
