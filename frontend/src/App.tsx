import * as React from 'react';
import './App.css';
import Registration from "./Registration";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <nav className="navbar is-dark" role="navigation">
          <div className="navbar-brand">
            <h1 className="navbar-item">
              User authentication study
            </h1>
          </div>
        </nav>
        <Registration />
      </div>
    );
  }
}

export default App;
