export const readFeedback = () => JSON.parse(localStorage.getItem('rankList'));

export const saveFeedback = (list) => localStorage
  .setItem('rankList', JSON.stringify(list));
