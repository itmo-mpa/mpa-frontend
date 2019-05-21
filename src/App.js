import React from 'react';
import './App.css';
import { Menu, Ref, Sidebar, Segment } from 'semantic-ui-react';
import PatientInfo from './components/PatientInfo/PatientInfo';
import States from './components/States/States';
import SidebarList from './components/SidebarList/SidebarList';

export default class App extends React.Component {
  state = {
      burgerRef: null,
      patient: {}
  };
    patientOnChange = (patient) => {
        this.setState({ patient });
    };

    render () {
        const { patient } = this.state;
        console.log('app patient', patient);

        return (
            <Sidebar.Pushable as={Segment}>
                <SidebarList trigger={this.state.burgerRef} patientOnChange={this.patientOnChange}/>
                <Sidebar.Pusher className="App">
                    <Menu attached="top">
                        <Ref innerRef={burger => this.setState({ burgerRef: burger })}>
                            <Menu.Item icon="bars" />
                        </Ref>
                    </Menu>
                    {patient && <PatientInfo patient={patient}/>}
                    {/* принимаем на веру то, что бек создаёт статус при создании пациента */}
                    {patient && <States patientId={patient.id} status={patient.status}/> }
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}
