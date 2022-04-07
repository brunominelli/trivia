import PropTypes from 'prop-types';
import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 30,
      timerId: '',
    };
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate() {
    const { resetTimer, hasAnswered } = this.props;

    if (resetTimer && hasAnswered) {
      this.initialTime();
      this.timer();
      console.log(resetTimer, hasAnswered);
    }
  }

  initialTime = () => {
    this.setState({ time: 30 });
  }

  timer = () => {
    const second = 1000;
    const intervalId = setInterval(this.setTimer, second);

    this.setState({
      timerId: intervalId,
    });
  }

  setTimer = () => {
    const { time, timerId } = this.state;
    const { handleDisabled, handleTimeout } = this.props;

    if (time === 0) {
      clearInterval(timerId);
      handleDisabled(time);
      handleTimeout();
    } else if (time > 0) {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    }
  }

  render() {
    const { time } = this.state;

    return (
      <p>
        Tempo restante:
        {' '}
        { time }
      </p>
    );
  }
}

Timer.propTypes = {
  handleDisabled: PropTypes.func,
}.isRequired;

export default Timer;
