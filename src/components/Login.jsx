import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };
  }

  handleDisableButton = () => {
    const { name, email } = this.state;
    const regexTest = /\S+@\S+\.\S+/;
    const maxLength = 3;
    const validEmail = regexTest.test(email);
    const validName = name.length >= maxLength;

    const isInvalid = !(validEmail && validName);

    this.setState({ isDisable: isInvalid });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.handleDisableButton());
  }

  render() {
    const { name, email, isDisable } = this.state;
    return (
      <>
        <label htmlFor="name">
          <input
            id="name"
            type="text"
            value={ name }
            name="name"
            data-testid="input-player-name"
            placeholder="Type your name"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="email">
          <input
            id="email"
            type="email"
            value={ email }
            name="email"
            data-testid="input-gravatar-email"
            placeholder="Type your email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          disabled={ isDisable }
        >
          Play
        </button>
      </>
    );
  }
}

export default Login;
