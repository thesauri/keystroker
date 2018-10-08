import * as React from 'react';
import './App.css';
import RegistrationDialog from './RegistrationDialog';

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
        <RegistrationDialog />
        <footer className="App-footer navbar is-fixed-bottom">
          <button className="button has-background-dark is-link">
            Back
          </button>
          <button className="button has-background-primary is-link">
            Next
          </button>
        </footer>
      </div>
    );
  }
}

export default App;
