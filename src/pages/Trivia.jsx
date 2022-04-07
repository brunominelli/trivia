import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Trivia extends Component {
  render() {
    const { history } = this.props;
    return (
      <section className="trivia-container">
        <Header />
        <Questions history={ history } />
      </section>
    );
  }
}

Trivia.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Trivia;
