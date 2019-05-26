import React from 'react';
import './App.css';
import { Menu, Ref, Sidebar, Segment } from 'semantic-ui-react';
import PatientInfo from './components/PatientInfo/PatientInfo';
import States from './components/States/States';
import SidebarList from './components/SidebarList/SidebarList';

export default class App extends React.Component {
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
                  <PatientInfo />
                  {/* принимаем на веру то, что бек создаёт статус при создании пациента */}
                  <States />
              </Sidebar.Pusher>
          </Sidebar.Pushable>
      );
  }
}
