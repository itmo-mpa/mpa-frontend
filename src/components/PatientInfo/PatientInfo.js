import React from 'react';
import { connect } from 'react-redux';
import './PatientInfo.css';
import AssociationForm from '../AssociationForm/AssociationForm';
import * as historyThunks from '../../redux/thunks/history';

export class PatientInfo extends React.Component {
    state = {
        history: []
    };

    componentWillReceiveProps (nextProps) {
        const { patient } = nextProps;

        if (patient && this.props.patient && patient.id === this.props.patient.id) {
            return;
        }

        this.props.getHistory(patient.id);
    }

    render () {
        const { name, birthDate } = this.props.patient;
        const { history = [] } = this.props;

        const dateObj = new Date(birthDate);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth();
        const now = new Date();

        const age = now.getFullYear() - year + (now.getMonth() - month < 0 ? 1 : 0);

        return (
            <aside className="PatientInfo">
                <section className="PatientInfo-Name">
                    <h2>{name}</h2>
                </section>
                <section className="PatientInfo-Description">
                    <h3>Info</h3>
                    <div>
                        <div style={{ position: 'relative' }}>
                            <AssociationForm position='right' getData={() => ({ predicate: `eq({patient.age}, ${age})`, type: 'patient' })} />
                            <p>Birth date: {birthDate}</p>
                        </div>
                        {/* <p>Gender: {gender}</p> */}
                    </div>
                </section>
                <section className="PatientInfo-History">
                    <h3>History</h3>
                    {history.map(event =>
                        <div key={event.id}>
                            <p>date:{event.submittedOn}</p>
                            <p>name:{event.state.name}</p>
                            <br/>
                        </div>)
                    }
                </section>
            </aside>
        );
    }
}

export default connect(
    store => ({
        patient: store.patient,
        history: store.history
    }),
    {
        getHistory: historyThunks.get
    }
)(PatientInfo);
