import he from 'he';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/questions.css';
import {
  fetchApi, getQuestions, getScore,
  resetCorrect, saveCorrect,
} from '../redux/action';
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
      resetTimer: false,
      currentPoints: 0,
    };
  }

  componentDidMount() {
    const { token, resetCorrectProps } = this.props;
    resetCorrectProps();
    if (token.length > 0) this.receiveToken();
  }

  componentDidUpdate(prevProps) {
    const { currentPoints } = this.state;
    const { token, getScoreProps } = this.props;
    if (token !== prevProps.token) {
      this.receiveToken();
    } if (currentPoints !== prevProps.currentPoints) { getScoreProps(currentPoints); }
  }

  receiveToken = () => {
    this.setState({ loading: false });
    this.handleFetchTrivia();
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

  nextQuestion = () => {
    const { history } = this.props;
    const { trivia, counter } = this.state;
    const arrayAnswers = document.querySelector('.answer-container').childNodes;
    arrayAnswers.forEach((element) => {
      element.classList.remove('true', 'false');
    });
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      isDisabled: false,
      resetTimer: true,
    }), () => {
      this.setState({ hasAnswered: false, resetTimer: false });
    });
    if (counter === trivia.length - 1) {
      history.push('feedback');
    }
  };

  handleDisabled = (time) => {
    if (time === 0) {
      this.setState({ isDisabled: true });
    }
  }

  displayButton = () => (
    <button
      className="btn-next"
      data-testid="btn-next"
      type="button"
      onClick={ this.nextQuestion }
    >
      Next
    </button>
  )

  handlePoints= (target) => {
    const { trivia, counter } = this.state;
    const { saveCorrectProps } = this.props;
    const currentTime = +document.querySelector('#time').innerText;
    const hard = 3;
    const points = 10;
    let sum = 0;
    if (target.innerText === trivia[counter].correct_answer) {
      saveCorrectProps(1);
      switch (trivia[counter].difficulty) {
      case 'easy':
        sum = points + (currentTime * 1);
        this.setState((prevState) => ({
          currentPoints: prevState.currentPoints + sum,
        }));
        break;
      case 'medium':
        sum = points + (currentTime * 2);
        this.setState((prevState) => ({
          currentPoints: prevState.currentPoints + sum,
        }));
        break;
      case 'hard':
        sum = points + (currentTime * hard);
        this.setState((prevState) => ({
          currentPoints: prevState.currentPoints + sum,
        }));
        break;
      default:
        break;
      }
    }
  }

  handleTimer = (callback) => callback

  handleClickAnswer = ({ target }) => {
    this.handleTimer();
    const arrayAnswers = target.parentNode.childNodes;
    arrayAnswers.forEach((element) => {
      if (element.id.includes('correct')) {
        element.classList.add('true');
      } else {
        element.classList.add('false');
      }
    });
    this.handlePoints(target);
    this.setState({ hasAnswered: true });
  }

  showAnswer = (hasAnswered, answer) => {
    const { trivia, counter } = this.state;
    if (hasAnswered) {
      return answer === trivia[counter].correct_answer
        ? 'true'
        : 'false';
    }
  }

  handleTimeout = () => {
    this.setState({
      hasAnswered: true,
    });
  }

  render() {
    const { loading, trivia, counter, hasAnswered, isDisabled, resetTimer } = this.state;
    return (
      <section className="container-questions">
        {loading
          ? (<div>Carregando...</div>)
          : (
            <div className="main-questions">
              <div className="left-side">
                <div className="question-container">
                  <h3
                    data-testid="question-category"
                    className="question-category"
                  >
                    { trivia.length > 0 && trivia[counter].category }
                  </h3>
                  <h2
                    data-testid="question-text"
                    className="question-text"
                  >
                    { he.decode(`${trivia.length > 0 && trivia[counter].question}`) }
                  </h2>
                </div>
              </div>
              <div className="right-side">
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
                        type="button"
                        className={ `div-answers ${
                          this.showAnswer(hasAnswered, answers[counter][index])}` }
                        disabled={ isDisabled }
                        onClick={ this.handleClickAnswer }
                        key={ index }
                      >
                        {he.decode(`${answers[counter][index]}`)}
                      </button>
                    );
                  })}
                </div>
                <div className="timer-and-next">
                  <Timer
                    handleDisabled={ this.handleDisabled }
                    handleTimeout={ this.handleTimeout }
                    resetTimer={ resetTimer }
                    hasAnswered={ hasAnswered }
                    handleTimer={ this.handleTimer }
                  />
                  {hasAnswered && this.displayButton()}
                </div>
              </div>
            </div>
          )}
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
  getScoreProps: (score) => dispatch(getScore(score)),
  saveCorrectProps: (correct) => dispatch(saveCorrect(correct)),
  resetCorrectProps: () => dispatch(resetCorrect()),
});

Questions.propTypes = {
  fetchApiProps: PropTypes.func,
  getQuestionsProps: PropTypes.func,
  getScoreProps: PropTypes.func,
  saveCorrectProps: PropTypes.func,
  token: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
