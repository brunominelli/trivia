import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { readFeedback } from '../services/localStorage';

class Ranking extends Component {
  redirectLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleRanking = () => {
    /* Referência sort array by biggest number: https://www.codegrepper.com/code-examples/javascript/javascript+sort+array+by+biggest+number */
    const list = readFeedback()
      .sort((previous, current) => current.score - previous.score);

    return (
      <>
        {list.map((feedback, index) => (
          <div key={ index }>
            <img src={ feedback.picture } alt="Gravatar" />
            <div
              data-testid={ `player-name-${index}` }
            >
              {feedback.name}
            </div>
            <div
              data-testid={ `player-score-${index}` }
            >
              {feedback.score}
            </div>
          </div>
        ))}
      </>
    );
  }

  render() {
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <div>
          { readFeedback().length === 0
            ? <div>Ranking vazio</div>
            : this.handleRanking()}

        </div>
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
