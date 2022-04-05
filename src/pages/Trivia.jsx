import React, { Component } from 'react';
import Questions from '../components/Questions';

class Trivia extends Component {
  render() {
    return (
      <section className="trivia-container">
        <Questions />
      </section>
    );
  }
}

export default Trivia;
