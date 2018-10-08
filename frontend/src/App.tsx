import * as React from 'react';
import './App.css';


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
        <div className="section">
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <div className="tile is-child notification is-primary">
                <p className="title">
                  Registration
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac placerat lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <div className="field">
                  <label className="label has-text-white">
                    Email
                  </label>
                  <div className="control">
                    <input className="input" type="email" placeholder="username@aalto.fi" autoFocus={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
