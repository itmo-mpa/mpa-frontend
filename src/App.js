import React, { Component } from 'react';
import './App.css';
import { Menu, Ref, Sidebar, Segment } from 'semantic-ui-react';
import PatientInfo from './components/PatientInfo/PatientInfo';
import States from './components/States/States';
import SidebarList from './components/SidebarList/SidebarList';

class App extends Component {
  state = {
    burgerRef: null
  };

  render () {
    return (
      <Sidebar.Pushable as={Segment}>
        <SidebarList trigger={this.state.burgerRef} />
        <Sidebar.Pusher className="App">
          <Menu attached="top">
            <Ref innerRef={burger => this.setState({ burgerRef: burger })}>
              <Menu.Item icon="bars" />
            </Ref>
          </Menu>
          <PatientInfo/>
          <States/>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default App;
