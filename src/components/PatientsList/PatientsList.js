import React from 'react';
import { connect } from 'react-redux';
import * as patientsThunks from '../../redux/thunks/patients';
import { NavLink } from 'react-router-dom';

class PatientsListContainer extends React.Component {
    componentDidMount () {
        this.props.getPatients();
    }

    render () {
        const { patients } = this.props;

        return (
            <section className={'PatientsList'}>
                <h2>Patients</h2>
                <ul className={'PatientsList-List'}>
                    {patients.map(patient => {
                        return (
                            <NavLink to={`/patient/${patient.id}/draft`} key={patient.id}>
                                <li
                                    className={'PatientsList-Item'}
                                    style={{ cursor: 'pointer' }}>
                                    {patient.name} ({patient.birthDate})
                                </li>
                            </NavLink>
                        );
                    })}
                </ul>
            </section>
        );
    }
}

export const PatientsList = connect(
    store => ({
        patients: store.patients || []
    }),
    {
        getPatients: patientsThunks.get
    }
)(PatientsListContainer);
