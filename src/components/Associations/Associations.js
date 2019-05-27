import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as associationsThunks from '../../redux/thunks/associations';

export class Associations extends Component {
    async componentWillReceiveProps ({ patientId }) {
        if (patientId === this.props.patientId) {
            return;
        }

        await this.props.getAssociations(patientId);
        console.log('GET Associations', this.props.associations);
    }

    render () {
        const { associations } = this.props;

        return (
            <div className='States-Draft'>
                <h2>Ассоциации</h2>
                {associations.map(association => {
                    return (
                        <div key={association.id}>
                            <p><b>{association.type}: </b>{association.text}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default connect(
    store => ({
        associations: store.associations,
        patientId: store.patient.id
    }),
    {
        getAssociations: associationsThunks.get
    }
)(Associations);
