import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    const playerImage = md5(gravatarEmail).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${playerImage}`;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ gravatarUrl } alt="" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
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
  // gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
