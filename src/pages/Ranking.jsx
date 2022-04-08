import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  redirectLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.redirectLogin }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;
