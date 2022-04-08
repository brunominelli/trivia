import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Configuration from '../pages/Configuration';
import Feedback from '../pages/Feedback';
import Login from '../pages/Login';
import Ranking from '../pages/Ranking';
import Trivia from '../pages/Trivia';

class WillOpen extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/trivia" component={ Trivia } />
        <Route path="/settings" component={ Configuration } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

export default WillOpen;
