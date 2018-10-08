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
      </div>
    );
  }
}

export default App;
