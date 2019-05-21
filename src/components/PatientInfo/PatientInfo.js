import './PatientInfo.css';
import React from 'react';
import { getHistory } from '../../Services/draftService';
import AssociationForm from '../AssoсiationForm/AssociationForm';

export default class PatientInfo extends React.Component {
    state = {
        history: []
    };

    componentWillReceiveProps (nextProps) {
        const { patient } = nextProps;

        patient && getHistory(patient.id).then(history => {
            console.log('GET history', history);
            this.setState({ history });
        });
    }

    render () {
        const { name, birthDate } = this.props.patient;
        const { history } = this.state;

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
                            <AssociationForm position='right' getData={() => `eq($patient.age, ${age})`} />
                            <p>Birth date: {birthDate}</p>
                        </div>
                        {/* <p>Gender: {gender}</p> */}
                    </div>
                </section>
                <section className="PatientInfo-History">
                    <h3>History</h3>
                    {history && history !== [] && <span>{JSON.stringify(history)}</span>}
                </section>
            </aside>
        );
    }
}
