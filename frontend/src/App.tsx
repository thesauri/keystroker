import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Registration from "./Registration";

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Route path="/register" component={Registration} />
      </Router>
    );
  }
}

export default App;
