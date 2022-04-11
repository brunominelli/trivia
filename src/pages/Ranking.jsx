import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { readFeedback } from '../services/localStorage';
import style from '../assets/Ranking.module.css';

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
          <div key={ index } className={ style.ranking_player }>
            <img
              src={ feedback.picture }
              alt="Gravatar"
              className={ style.player_image }
            />
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
      <div className={ style.container }>
        <h1
          data-testid="ranking-title"
          className={ style.ranking_title }
        >
          Ranking
        </h1>
        <div className={ style.wrapper }>
          { readFeedback().length === 0
            ? <div>Ranking vazio</div>
            : this.handleRanking()}
          <button
            data-testid="btn-go-home"
            type="button"
            onClick={ this.redirectLogin }
            className={ style.button_play_again }
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;
