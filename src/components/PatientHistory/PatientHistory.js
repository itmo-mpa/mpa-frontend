import React from 'react';
import { connect } from 'react-redux';
import * as historyThunks from '../../redux/thunks/history';
import { Loader } from 'semantic-ui-react';

class PatientHistoryContainer extends React.Component {
    componentDidMount () {
        const { patient, getHistory } = this.props;
        getHistory(patient.id);
    }

    render () {
        // const { birthDate } = this.props.patient;
        const { history } = this.props;

        // const dateObj = new Date(birthDate);
        // const year = dateObj.getFullYear();
        // const month = dateObj.getMonth();
        // const now = new Date();
        // const age = now.getFullYear() - year + (now.getMonth() - month < 0 ? 1 : 0);

        return (
            <section className="History">
                <h3>История пациента</h3>
                {history ? history.map(event =>
                    <div key={event.id}>
                        {console.log(event)}
                        <p> <b>Дата:</b> {event.submittedOn}</p>
                        <p><b>Название:</b> {event.state.name}</p>
                        <p><b>Описание:</b> {event.state.description}</p>
                        { event.attributes.length
                            ? <p><b>Атрибуты:</b>
                                <ul>
                                    {event.attributes.map(attr =>
                                        <li key={attr.name}>
                                            <b>Название:</b> {attr.name}
                                            <br/>
                                            <b>Доза:</b> {attr.value}
                                        </li>)}
                                </ul>
                            </p> : null}
                        <hr/>
                    </div>) : <Loader/>
                }
            </section>
        );
    }
}

export const PatientHistory = connect(
    store => ({
        patient: store.patient,
        history: store.history
    }),
    {
        getHistory: historyThunks.get
    }
)(PatientHistoryContainer);
