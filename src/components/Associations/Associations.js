import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as associationsThunks from '../../redux/thunks/associations';

export class Associations extends Component {
    async componentWillMount () {
        await this.props.getAssociations();

        console.log('GET Associations', this.props.associations);
    }

    render () {
        const { associations } = this.props;

        return (
            <div className='States-Draft'>
                <h2>Associations</h2>
                {associations.map(association => {
                    return (
                        <div>
                            <p><b>{association.predicate}</b></p>
                            <p>{association.text}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default connect(
    store => ({
        associations: store.associations
    }),
    {
        getAssociations: associationsThunks.get
    }
)(Associations);
