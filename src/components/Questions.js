import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as api from '../services/api';
import { fetchApi } from '../redux/action';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trivia: [],
      counter: 0,
    };
  }

  componentDidMount() {
    this.handleFetchTrivia();
  }

  handleClick = () => {
    this.setState((previous) => ({
      counter: previous.counter + 1,
    }));
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

  render() {
    const { trivia, counter } = this.state;
    return (
      <section className="container-questions">
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
        <div>
          <h1>Opções</h1>
        </div>
        <div>oi</div>
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

// Pegar a pergunta

/* {
   "response_code":0,
   "results":[
      {
         "category":"Entertainment: Video Games",
         "type":"multiple",
         "difficulty":"easy",
         "question":"What is the first weapon you acquire in Half-Life?",
         "correct_answer":"A crowbar",
         "incorrect_answers":[
            "A pistol",
            "The H.E.V suit",
            "Your fists"
         ]
      }
   ]
} */

// Vamos fazer um map do result
