import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { readFeedback, saveFeedback } from '../services/localStorage';

class Feedback extends Component {
  componentDidMount() {
    const { name, gravatarEmail, assertionsProps, scoreProps } = this.props;

    if (!JSON.parse(localStorage.getItem('rankList'))) {
      localStorage.setItem('rankList', JSON.stringify([]));
    }

    const info = {
      name, score: scoreProps, assertions: assertionsProps, picture: gravatarEmail };
    const storageRanking = readFeedback();
    saveFeedback([...storageRanking, info]);
  }

  render() {
    const { assertionsProps, scoreProps } = this.props;
    const minimumAssertions = 3;

    return (
      <>
        <Header />
        <div
          data-testid="feedback-text"
        >
          {assertionsProps >= minimumAssertions
            ? 'Well Done!' : 'Could be better...'}
        </div>
        <div
          data-testid="feedback-total-question"
        >
          {assertionsProps}
        </div>
        <div
          data-testid="feedback-total-score"
        >
          {scoreProps}
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
