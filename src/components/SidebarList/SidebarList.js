import React from 'react';
import { Sidebar, Menu, Ref } from 'semantic-ui-react';
import NewPatientForm from '../NewPatientFormModal/NewPatientFormModal';

const patients = [
    { name: 'Василий Петров', gender: 'male', birthdate: '01.01.1970' },
    { name: 'Петр Васечкин', gender: 'male', birthdate: '01.01.1970' }
];

export default class SidebarList extends React.Component {
    state = {
        opened: false,
        animating: false
    };

    sidebarRef = null;

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
    }

    closeSidebar = (e) => {
        if (this.state.animating || this.sidebarRef.contains(e.target)) {
            return;
        }

        this.setState({
            opened: false,
            animating: true
        });

        document.removeEventListener('click', this.closeSidebar);
    }

    render () {
        return (
            <Ref innerRef={node => { this.sidebarRef = node; }}>
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
                    {patients.map(patient => {
                        return (
                            <Menu.Item as='div'>
                                {patient.name} ({patient.birthdate})
                            </Menu.Item>
                        );
                    })}
                    <Menu.Item as={NewPatientForm} />
                </Sidebar>
            </Ref>
        );
    }
}
