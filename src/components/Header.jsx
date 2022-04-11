import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import '../assets/header.css';

class Header extends React.Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    const playerImage = md5(gravatarEmail).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${playerImage}`;
    return (
      <header className="header-container">
        <div className="logo-name-wrapper">
          <img
            className="header-gravatar"
            data-testid="header-profile-picture"
            src={ gravatarUrl }
            alt="gravatar"
          />
          <p className="header-name" data-testid="header-player-name">{ name }</p>
        </div>
        <p className="header-score" data-testid="header-score">
          { `Pontos: ${score}` }
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
