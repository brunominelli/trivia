import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../redux/action/index';
// import * as api from '../services/api';

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

  handleClick = () => {
    const { history, fetchApiProp } = this.props;
    fetchApiProp();
    history.push('/trivia');
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
          onClick={ this.handleClick }
        >
          Play
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchApiProp: () => dispatch(fetchApi()),
});

Login.propTypes = {
  fetchApiProp: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
