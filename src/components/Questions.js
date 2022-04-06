import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchApi } from '../redux/action';
import * as api from '../services/api';
import Timer from './Timer';
import '../assets/questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      trivia: [],
      counter: 0,
      isDisabled: false,
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

  handleDisabled = (time) => {
    if (time === 0) {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleClick = () => {
    this.setState((previous) => ({
      counter: previous.counter + 1,
    }));
  }

  handleClickAnswer = ({ target }) => {
    const arrayAnswers = target.parentNode.childNodes;
    arrayAnswers.forEach((element) => {
      if (element.id.includes('correct')) {
        element.classList.add('true');
      } else {
        element.classList.add('false');
      }
    });
  }

  render() {
    const { loading, trivia, counter, isDisabled } = this.state;
    const shuffle = 0.5;

    return (
      <section className="container-questions">
        {loading
          ? (<div>Carregando...</div>)
          : (
            <>
              <div className="question-container">
                <h3
                  data-testid="question-category"
                >
                  { trivia.length > 0 && trivia[counter].category }
                </h3>
                <h2
                  data-testid="question-text"
                >
                  { trivia.length > 0 && trivia[counter].question }
                </h2>
              </div>
              <div
                className="answer-container"
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
                        id={
                          question === trivia[counter].correct_answer
                            ? 'correct-answer'
                            : `wrong-answer-${index}`
                        }
                        type="button"
                        className="div-answers"
                        disabled={ isDisabled }
                        onClick={ this.handleClickAnswer }
                        key={ index }
                      >
                        {question}
                      </button>
                    ))}
              </div>
              <Timer handleDisabled={ this.handleDisabled } />
            </>
          )}
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
