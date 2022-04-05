import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as api from '../services/api';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trivia: [],
    };
  }

  componentDidMount() {
    this.handleFetchTrivia();
  }

  handleFetchTrivia = async () => {
    const { token, fetchApiProp } = this.props;
    const totalQuestions = 5;
    const responseLimit = 3;
    const data = await api.fetchTriviaAPI(totalQuestions, token);
    if (data.response_code === responseLimit) {
      api.fetchApiProp();
    } else {
      this.setState({
        trivia: data && data.results,
      });
    }
  };

  render() {
    return <>oi</>;
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiProp: () => dispatch(fetchApi()),
});

Questions.propTypes = {
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
