import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/questions.css';
import { fetchApi, getQuestions } from '../redux/action';
import * as api from '../services/api';
import Timer from './Timer';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      trivia: [],
      counter: 0,
      hasAnswered: false,
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
    const { token, fetchApiProps, getQuestionsProps } = this.props;
    const totalQuestions = 5;
    const responseLimit = 3;
    const data = await api.fetchTriviaAPI(totalQuestions, token);
    getQuestionsProps(data);

    if (data.response_code === responseLimit) {
      fetchApiProps();
    } else {
      this.setState({
        trivia: data && data.results,
      });
    }
  };

  nextQuestion = ({ target }) => {
    const arrayAnswers = target.previousSibling.childNodes;

    arrayAnswers.forEach((element) => {
      element.classList.remove('true', 'false');
    });

    this.setState((prevState) => ({
      hasAnswered: false,
      counter: prevState.counter + 1,
    }));
  };

  handleDisabled = (time) => {
    if (time === 0) {
      this.setState({
        isDisabled: true,
      });
    }
  }

  displayButton = () => (
    <button
      data-testid="btn-next"
      type="button"
      onClick={ this.nextQuestion }
    >
      Next
    </button>
  )

  handleClickAnswer = ({ target }) => {
    const arrayAnswers = target.parentNode.childNodes;
    arrayAnswers.forEach((element) => {
      if (element.id.includes('correct')) {
        element.classList.add('true');
      } else {
        element.classList.add('false');
      }
    });

    this.setState({
      hasAnswered: true,
    });
  }

  render() {
    const { loading, trivia, counter, hasAnswered, isDisabled } = this.state;

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
                  ].map((question, index) => {
                    const { answers } = this.props;

                    return (
                      <button
                        data-testid={
                          answers[counter][index] === trivia[counter].correct_answer
                            ? 'correct-answer'
                            : `wrong-answer-${index}`
                        }
                        id={
                          answers[counter][index] === trivia[counter].correct_answer
                            ? 'correct-answer'
                            : `wrong-answer-${index}`
                        }
                        type="button"
                        className="div-answers"
                        disabled={ isDisabled }
                        onClick={ this.handleClickAnswer }
                        key={ index }
                      >
                        {answers[counter][index]}
                      </button>
                    );
                  })}
              </div>
              <Timer handleDisabled={ this.handleDisabled } />
            </>
          )}
        {hasAnswered && this.displayButton()}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  answers: state.questions.shuffledResults,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiProps: () => dispatch(fetchApi()),
  getQuestionsProps: (data) => dispatch(getQuestions(data)),
});

Questions.propTypes = {
  fetchApiProps: PropTypes.func,
  getQuestions: PropTypes.func,
  token: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
