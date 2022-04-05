// const obj = {
//   name: 'nome-da-pessoa',
//   assertions: 'número-de-acertos',
//   score: 'pontuação',
//   gravatarEmail: 'email-da-pessoa',
// };

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default player;
