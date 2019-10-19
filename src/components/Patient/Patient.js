import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SideBar from '../Sidebar/Sidebar';
import { routes } from '../../constants';
import './Patient.css';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import * as patientThunks from '../../redux/thunks/patient';

class PatientContainer extends React.PureComponent {
    render () {
        if (!this.props.patient.id) {
            console.log(this.props);
            this.props.getPatient(this.props.match.params.patientId);
            return (
                <Dimmer active inverted>
                    <Loader inverted/>
                </Dimmer>
            );
        }

        return (
            <section className="Patient">
                <SideBar/>
                <div className={'Patient-Main'}>
                    <Switch>
                        {routes.map(route =>
                            <Route path={route.path} component={route.component} exact key={route.path}/>)}
                    </Switch>
                </div>
            </section>);
    }
};

export const Patient = connect(
    store => ({
        patient: store.patient
    }),
    {
        getPatient: patientThunks.get
    }
)(PatientContainer);