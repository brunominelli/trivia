import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchApi } from '../redux/action';
import * as api from '../services/api';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      trivia: [],
      counter: 0,
      hasAnswered: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { token } = this.props;

    if (token !== prevProps.token) {
      this.receiveToken();
    }
  }

  receiveToken = () => {
    this.handleFetchTrivia();

    this.setState({ loading: false });
  }

  handleFetchTrivia = async () => {
    const { token, fetchApiProps } = this.props;
    const totalQuestions = 5;
    const responseLimit = 3;
    const data = await api.fetchTriviaAPI(totalQuestions, token);

    if (data.response_code === responseLimit) {
      fetchApiProps();
    } else {
      this.setState({
        trivia: data && data.results,
      });
    }
  };

  handleClick = () => {
    this.setState({
      hasAnswered: true,
    });
  }

  nextQuestion = () => {
    this.setState((prevState) => ({
      hasAnswered: false,
      counter: prevState.counter + 1,
    }));
  }

  displayButton = () => (
    <button
      type="button"
      onClick={ this.nextQuestion }
    >
      Next
    </button>
  )

  render() {
    const { loading, trivia, counter, hasAnswered } = this.state;
    const shuffle = 0.5;

    return (
      <section className="container-questions">
        {loading
          ? (<div>Carregando...</div>)
          : (
            <>
              <div className="question-container">
                <h2
                  data-testid="question-category"
                >
                  { trivia.length > 0 && trivia[counter].category }
                </h2>
                <h2
                  data-testid="question-text"
                >
                  { trivia.length > 0 && trivia[counter].question }
                </h2>
              </div>
              <div
                data-testid="answer-options"
              >
                {/* Referência randomizar array: https://flaviocopes.com/how-to-shuffle-array-javascript/ */}
                { trivia.length > 0
                  && [
                    trivia[counter].correct_answer,
                    ...trivia[counter].incorrect_answers,
                  ].sort(() => Math.random() - shuffle)
                    .map((question, index) => (
                      <button
                        data-testid={
                          question === trivia[counter].correct_answer
                            ? 'correct-answer'
                            : `wrong-answer-${index}`
                        }
                        key={ index }
                        type="button"
                        onClick={ this.handleClick }
                      >
                        {question}
                      </button>
                    ))}
              </div>
            </>
          )}
        {hasAnswered && this.displayButton()}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiProps: () => dispatch(fetchApi()),
});

Questions.propTypes = {
  fetchApiProps: PropTypes.func,
  token: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
