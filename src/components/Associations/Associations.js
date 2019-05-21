import React, { Component } from 'react';
import { getAssociations } from '../../Services/associationService';

export default class Associations extends Component {
    state = {
        associations: []
    };

    async componentWillMount () {
        const associations = await getAssociations();

        console.log('GET Associations', associations);

        this.setState({ associations });
    }

    render () {
        const { associations } = this.state;

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
