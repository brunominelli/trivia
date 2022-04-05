import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Trivia from '../pages/Trivia';
import Configuration from '../pages/Configuration';

class WillOpen extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/trivia" component={ Trivia } />
        <Route path="/settings" component={ Configuration } />
      </Switch>
    );
  }
}

export default WillOpen;
