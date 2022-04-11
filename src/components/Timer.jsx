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
    const { resetTimer, hasAnswered, handleTimer } = this.props;
    const { timerId, time } = this.state;

    if (hasAnswered) handleTimer(clearInterval(timerId), time);
    if (resetTimer && hasAnswered) {
      this.initialTime();
      this.timer();
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
      <div className="timer">
        <p id="time">{ time }</p>
      </div>
    );
  }
}

Timer.propTypes = {
  handleDisabled: PropTypes.func,
}.isRequired;

export default Timer;
