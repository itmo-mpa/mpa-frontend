import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SideBar } from '../Sidebar/Sidebar';
import { routes } from '../../constants';
import { connect } from 'react-redux';
import { Dimmer, Loader, Card } from 'semantic-ui-react';
import * as patientThunks from '../../redux/thunks/patient';
import './Patient.css';

class PatientContainer extends React.PureComponent {
    constructor () {
        super();
        this.state = { loaded: false };
    }

    componentDidMount () {
        this.props.getPatient(this.props.match.params.patientId)
            .then(() => this.setState({ loaded: true }));
    }

    render () {
        const { loaded } = this.state;
        const { patient } = this.props;

        if (!loaded) {
            return (
                <Dimmer active inverted>
                    <Loader inverted/>
                </Dimmer>
            );
        }

        return (
            <section className="Patient">
                <Card className="Patient-General"
                    header={patient.name}
                    meta={patient.diseaseName}
                    description={`Дата рождения: ${patient.birthDate}`}
                />
                {console.log(patient)}
                <SideBar/>
                <div className={'Patient-Main'}>
                    <Switch>
                        {routes.map(route =>
                            <Route path={route.path} component={route.component} key={route.path}/>)}
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
