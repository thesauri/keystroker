import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Registration from "./registration/Registration";
import Login from './login/Login';
import Attack from './attack/Attack';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={Registration} exact={true} />
          <Route path="/attack" component={Attack} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
        </div>
      </Router>
    );
  }
}

export default App;
