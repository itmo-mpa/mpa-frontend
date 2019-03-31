import {Component} from "react";
import './PatientInfo.css';
import React from "react";
import NewStatusForm from "../NewStatusForm/NewStatusForm";
import {getPatientById} from "../../Services/patientService";
export default class PatientInfo extends Component {

    state = {};

    componentDidMount(){
        getPatientById(1).then(res =>{ //TODO: get from props
            this.setState(res);
            console.log(res);
        });
    }
    render() {
        const {name, age} = this.state;
        return (
            <aside className="PatientInfo">
                <section className="PatientInfo-Name">
                    <h3>{name} &nbsp;</h3>
                </section>
                <section className="PatientInfo-Description">
                    <h3>Info</h3>
                    <div>
                        <p>age: {age}</p>
                    </div>
                </section>
                <section className="PatientInfo-History">
                    <h3>History</h3>
                </section>
                <NewStatusForm/>
            </aside>
        );
    }
}
