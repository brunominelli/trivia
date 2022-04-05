const TOKEN_BASE_URL = 'https://opentdb.com/api_token.php?command=request';

export const fetchTokenAPI = async () => {
  const response = await fetch(TOKEN_BASE_URL);
  const data = await response.json();
  return data;
};

export const fetchTriviaAPI = async (quantity, playerToken) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=${quantity}&token=${playerToken}`);
  const data = await response.json();
  return data;
};
