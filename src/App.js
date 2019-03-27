import React, { Component } from 'react';
import './App.css';
import {Menu} from "semantic-ui-react";
import PatientInfo from "./components/PatientInfo/PatientInfo";
import States from "./components/States/States";

class App extends Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
