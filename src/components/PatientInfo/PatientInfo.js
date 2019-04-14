import './PatientInfo.css';
import React from 'react';
import { getHistory } from '../../Services/draftService';

export default class PatientInfo extends React.Component {
    state = {
        history: []
    };

    componentWillReceiveProps(nextProps) {
        const { patient } = nextProps;

        patient && getHistory(patient.id).then(history => {
            console.log('GET history', history );
            this.setState({ history })
        });
    }

    render () {
        const { name, birthDate } = this.props.patient;
        const { history } = this.state;
        return (
            <aside className="PatientInfo">
                <section className="PatientInfo-Name">
                    <h2>{name}</h2>
                </section>
                <section className="PatientInfo-Description">
                    <h3>Info</h3>
                    <div>
                        <p>Birth date: {birthDate}</p>
                        {/* <p>Gender: {gender}</p> */}
                    </div>
                </section>
                <section className="PatientInfo-History">
                    <h3>History</h3>
                    {history && history!==[] && <span>{JSON.stringify(history)}</span>}
                </section>
            </aside>
        );
    }
}
