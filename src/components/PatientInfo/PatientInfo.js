import {Component} from "react";
import './PatientInfo.css';
import React from "react";

export default class PatientInfo extends Component {
    render() {
        return (
            <aside className="PatientInfo">
                <section className="PatientInfo-Name">
                    <h3>Patient Name</h3>
                </section>
                <section className="PatientInfo-Anamnesis">
                    <h3>Anamnesis</h3>
                </section>
                <section className="PatientInfo-History">
                    <h3>History</h3>
                </section>
                <section className="PatientInfo-NewStatus">
                    <h3>Status form</h3>
                </section>
            </aside>
        );
    }
}
