import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 30,
    };
  }

  componentDidMount() {
    const second = 1000;
    setInterval(this.setTimer, second);
  }

  setTimer = () => {
    const { time } = this.state;
    const { handleDisabled } = this.props;
    if (time > 0) {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    } else {
      handleDisabled(time);
      clearInterval();
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
