import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Trivia from './Trivia';

class WillOpen extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/trivia" component={ Trivia } />
      </Switch>
    );
  }
}

export default WillOpen;
