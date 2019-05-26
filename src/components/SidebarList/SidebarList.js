import React from 'react';
import {connect} from 'react-redux';
import { Sidebar, Menu, Ref } from 'semantic-ui-react';
import NewPatientForm from '../NewPatientFormModal/NewPatientFormModal';
import * as patientThunks from '../../redux/thunks/patient';
import * as patientsThunks from '../../redux/thunks/patients';

export class SidebarList extends React.Component {
    state = {
        opened: false,
        animating: false,
    };

    sidebarRef = null;
    componentDidMount () {
        this.props.getPatients();
    }

    componentWillReceiveProps (nextProps) {
        if (!nextProps.trigger || nextProps.trigger === this.props.trigger) {
            return;
        }

        nextProps.trigger.addEventListener('click', this.openSidebar);
        nextProps.trigger.style.cursor = 'pointer';
    }

    openSidebar = () => {
        this.setState({
            opened: true,
            animating: true
        }, () => {
            document.addEventListener('click', this.closeSidebar);
        });
    };

    closeSidebar = (e) => {
        if (this.state.animating || this.sidebarRef.contains(e.target)) {
            return;
        }

        this.setState({
            opened: false,
            animating: true
        });

        document.removeEventListener('click', this.closeSidebar);
    };

    async patientOnClick (e, patient) {
        await this.props.getPatient(patient.id)

        document.body.click();
    }

    render () {
        const { patients } = this.props;

        return (
            <Ref innerRef={node => {
                this.sidebarRef = node;
            }}>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    vertical
                    visible={this.state.opened}
                    onShow={() => this.setState({ animating: false })}
                    onHide={() => this.setState({ animating: false })}
                    width='wide'
                >
                    <h2>Patients</h2>
                    {patients.map((patient, index) => {
                        return (
                            <Menu.Item as='div'
                                key={patient.id}
                                onClick={(e) => this.patientOnClick(e, patient)}
                                style={{ cursor: 'pointer' }}>
                                {patient.name} ({patient.birthDate})
                            </Menu.Item>
                        );
                    })}
                    <Menu.Item as={NewPatientForm}/>
                </Sidebar>
            </Ref>
        );
    }
}

export default connect(
    store => ({
        patients: store.patients || []
    }),
    {
        getPatient: patientThunks.get,
        getPatients: patientsThunks.get
    }
)(SidebarList);