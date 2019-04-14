import './PatientInfo.css';
import React from 'react';
import { getPatientById } from '../../Services/patientService';
export default class PatientInfo extends React.Component {
    state = {};

    componentDidMount () {
        getPatientById(1).then(res => { // TODO: get from props
            this.setState({ res });
        });
        // временнный костыль
        this.setState({
            name: 'test test test',
            age: '14.04.2019',
            gender: 'Unknown'
        });
    }
    render () {
        const { name, age, gender } = this.state;
        return (
            <aside className="PatientInfo">
                <section className="PatientInfo-Name">
                    <h2>{name}</h2>
                </section>
                <section className="PatientInfo-Description">
                    <h3>Info</h3>
                    <div>
                        <p>Birth date: {age}</p>
                        <p>Gender: {gender}</p>
                    </div>
                </section>
                <section className="PatientInfo-History">
                    <h3>History</h3>
                </section>
            </aside>
        );
    }
}
