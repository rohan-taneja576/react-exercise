import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import AddMeeting from './containers/addMeeting';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/addMeeting' component={AddMeeting}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
