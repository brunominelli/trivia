import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../assets/Feedback.module.css';
import Header from '../components/Header';
import { readFeedback, saveFeedback } from '../services/localStorage';

class Feedback extends Component {
  componentDidMount() {
    const { name, gravatarEmail, assertionsProps, scoreProps } = this.props;

    const playerImage = md5(gravatarEmail).toString();
    const picture = `https://www.gravatar.com/avatar/${playerImage}`;

    if (!JSON.parse(localStorage.getItem('rankList'))) {
      localStorage.setItem('rankList', JSON.stringify([]));
    }

    const info = {
      name, score: scoreProps, assertions: assertionsProps, picture };
    const storageRanking = readFeedback();

    if (info.name) {
      const hasFeedback = storageRanking.some(
        (feedback) => feedback.name === info.name
        && feedback.score === info.score
        && feedback.assertions === info.assertions
        && feedback.picture === info.picture,
      );

      if (!hasFeedback) saveFeedback([...storageRanking, info]);
    }
  }

  redirectLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  redirectRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertionsProps, scoreProps } = this.props;
    const minimumAssertions = 3;

    return (
      <>
        <Header />
        <div className={ styles.wrapper }>
          <div className={ styles.text__container }>
            <div
              data-testid="feedback-text"
              className={ styles.text__container__message }
            >
              {assertionsProps >= minimumAssertions
                ? 'Mandou bem!' : 'Podia ser melhor...'}
            </div>
            <div
              data-testid="feedback-total-question"
              className={ styles.text__container__assertions }
            >
              {`Você acertou ${assertionsProps} questões!`}
            </div>
            <div
              data-testid="feedback-total-score"
            >
              {`Um total de ${scoreProps} pontos`}
            </div>
          </div>
          <div className={ styles.button__container }>
            <button
              className={ styles.button__ranking }
              data-testid="btn-ranking"
              type="button"
              onClick={ this.redirectRanking }
            >
              Ranking
            </button>
            <button
              className={ styles.button__playAgain }
              data-testid="btn-play-again"
              type="button"
              onClick={ this.redirectLogin }
            >
              Play Again
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertionsProps: state.player.assertions,
  scoreProps: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

Feedback.propTypes = {
  assertionsProps: PropTypes.number,
  scoreProps: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
