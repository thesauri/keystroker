import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Registration from "./registration/Registration";
import Login from './login/Login';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={Registration} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
        </div>
      </Router>
    );
  }
}

export default App;
