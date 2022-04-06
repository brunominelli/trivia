import React from 'react';

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
    if (time > 0) {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    } else clearInterval();
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

export default Timer;
