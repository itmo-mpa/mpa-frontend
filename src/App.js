import React, { Component } from 'react';
import './App.css';
import {Menu} from "semantic-ui-react";

class App extends Component {
  render () {
    return (
      <div className="App">
          <Menu attached="top">
              <Menu.Item icon="bars"/>
          </Menu>

      </div>
    );
  }
}

export default App;
