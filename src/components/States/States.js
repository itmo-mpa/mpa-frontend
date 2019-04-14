import React from 'react';
import './States.css';
import {createDraft, getDraft, getNextStates} from '../../Services/draftService';
import StatusDraft from '../StatusDraft/StatusDraft';
import { NextState } from '../NextState/NextState';

export default class States extends React.Component {
    state = {
        nextStates: [],
        state: null
    };

    componentWillReceiveProps (nextProps) {
        let { patientId, status } = nextProps;
        if (!patientId) return;
        getDraft(patientId).then(
            (draft) => {
                this.setState(draft);
                console.log('GET draft', draft);
            }, (error) => { //eslint-disable-line
                const draftInitData = {
                    stateId: status.state.id,
                    medicines: [],
                    attributes: {}
                };
                createDraft(patientId, draftInitData).then((res) => {
                    console.log('PUT draft', res);
                });
            });
    }

    onNextStates = (nextStates) => {
        nextStates && nextStates.length && this.setState({
            ...this.state,
            nextStates
        });
    };
    confirmState = (state)=>{
        this.setState({
            ...this.state,
            state
        });
    };
    render () {
        const { patientId, status } = this.props;
        const { nextStates, state } = this.state;
        return (
            <React.Fragment>
                {status && (<section className="States">
                    <div className="States-PrevWrap States-Wrap">
                        <div className="States-Prev">
                            <h2 className='States-Heading'>Current State</h2>
                            <p>name: {status.state.name}</p>
                            <p>description: {status.state.description}</p>
                            <p>updated on: {status.submittedOn}</p>
                        </div>
                    </div>
                    <div className="States-DraftWrap States-Wrap">
                        <StatusDraft patientId={patientId} state={state || status.state} status={status} onNextStates={this.onNextStates}/>
                    </div>
                    {nextStates.length ? <div className="States-NextWrap States-Wrap">
                        <div className="States-Next">
                            {nextStates.map(nextState =>
                                <NextState {...nextState} key={nextState.id} confirmState={this.confirmState}/>
                            )}
                        </div>
                    </div> : null
                    }
                </section>)}
            </React.Fragment>
        );
    }
}
