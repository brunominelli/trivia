import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Trivia extends Component {
  render() {
    return (
      <section className="trivia-container">
        <Header />
        <Questions />
      </section>
    );
  }
}

export default Trivia;
