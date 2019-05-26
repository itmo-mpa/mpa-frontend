import React from 'react';
import { connect } from 'react-redux';
import './States.css';
import * as draftThunks from '../../redux/thunks/draft';
import StatusDraft from '../StatusDraft/StatusDraft';
import { NextState } from '../NextState/NextState';
import AssociationForm from '../AssociationForm/AssociationForm';
import Associations from '../Associations/Associations';

export class States extends React.Component {
    state = {
        state: null
    };

    async componentWillReceiveProps (nextProps) {
        const { patientId, status } = nextProps;

        if (!patientId || patientId === this.props.patientId) {
            return;
        }

        if (status && this.props.status && status.state.id === this.props.status.state.id) {
            return;
        }

        try {
            await this.props.getDraft(patientId);
        } catch (e) {
            const draftInitData = {
                stateId: status.state.id,
                medicines: [],
                attributes: []
            };
            await this.props.createDraft(patientId, draftInitData);
        }
    }

    confirmState = (state) => {
        this.props.clearDraft();
        this.props.updateState(state);
    };

    associationData = () => {
        return `eq($StatusId, ${this.props.status.id})`;
    }

    render () {
        const { patientId, status, nextStates, draft } = this.props;
    
        return (
            <React.Fragment>
                {status && (<section className="States">
                    <div className="States-PrevWrap States-Wrap">
                        <div className="States-Prev">
                            <AssociationForm getData={this.associationData} />
                            <h2 className='States-Heading'>Current State</h2>
                            <p>name: {status.state.name}</p>
                            <p>description: {status.state.description}</p>
                            <p>updated on: {status.submittedOn}</p>
                        </div>
                    </div>
                    <div className="States-DraftWrap States-Wrap">
                        <StatusDraft patientId={patientId} state={draft.state} status={status}/>
                        <Associations />
                    </div>
                    {nextStates.length ? <div className="States-NextWrap States-Wrap">
                        <div className="States-Next">
                            {nextStates.map(nextState =>
                                <NextState key={nextState.state.id} confirmState={this.confirmState} {...nextState} />
                            )}
                        </div>
                    </div> : null
                    }
                </section>)}
            </React.Fragment>
        );
    }
}

export default connect(
    store => ({
        nextStates: store.nextStates,
        draft: store.draft,
        patientId: store.patient.id,
        status: store.patient.status
    }),
    {
        getDraft: draftThunks.get,
        createDraft: draftThunks.create,
        clearDraft: draftThunks.clear,
        updateState: draftThunks.updateState
    }
)(States);
