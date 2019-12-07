import React from 'react';
import { connect } from 'react-redux';
import * as graphThunks from '../../redux/thunks/graph';
import { baseUrl } from '../../Services/fetchService';

export class GraphContainer extends React.Component {
    render () {
        const { stateId } = this.props;

        return stateId ? <img alt="graph" src={`${baseUrl}/states/${stateId}/images`} /> : null;
    }
}

export const Graph = connect(null, { getGraph: graphThunks.get })(GraphContainer);
