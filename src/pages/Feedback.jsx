import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertionsProps } = this.props;
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertionsProps: state.player.assertions,
});

Feedback.propTypes = {
  assertionsProps: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
