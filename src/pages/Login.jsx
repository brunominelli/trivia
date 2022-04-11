/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import React from 'react';
import { GoGear } from 'react-icons/go';
import { connect } from 'react-redux';
import '../assets/login.css';
import { fetchApi, setPlayer } from '../redux/action/index';

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
    this.setState({ [name]: value }, this.handleDisableButton);
  }

  handleClick = () => {
    const { name, email } = this.state;
    const { history, fetchApiProp, dispatchSetPlayer } = this.props;
    dispatchSetPlayer(name, email);
    fetchApiProp();
    history.push('/trivia');
  }

  render() {
    const { name, email, isDisable } = this.state;
    const { history } = this.props;

    return (
      <section className="container">
        <div className="container-login">
          <GoGear
            data-testid="btn-settings"
            className="button-config"
            type="button"
            onClick={ () => { history.push('/settings'); } }
          />
          <div className="container-login-forms">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/2/27/Trivia.png"
              width={ 200 }
              alt="trivia"
              className="trivia-image"
            />
            <div className="inputs">
              <label className="label-name" htmlFor="name">
                <input
                  id="name"
                  className="input-name"
                  type="text"
                  value={ name }
                  name="name"
                  data-testid="input-player-name"
                  placeholder="Type your name"
                  onChange={ this.handleChange }
                />
              </label>

              <label className="label-email" htmlFor="email">
                <input
                  id="email"
                  className="input-email"
                  type="email"
                  value={ email }
                  name="email"
                  data-testid="input-gravatar-email"
                  placeholder="Type your email"
                  onChange={ this.handleChange }
                />
              </label>
            </div>
          </div>
          <button
            data-testid="btn-play"
            type="button"
            className="button-play"
            disabled={ isDisable }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchApiProp: () => dispatch(fetchApi()),
  dispatchSetPlayer: (name, gravatarEmail) => dispatch(setPlayer(name, gravatarEmail)),
});

Login.propTypes = {
  fetchApiProp: PropTypes.func,
  dispatchSetPlayer: PropTypes.func,
  history: PropTypes.instanceOf(Object),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
