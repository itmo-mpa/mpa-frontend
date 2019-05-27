import React from 'react';
import { connect } from 'react-redux';
import './States.css';
import * as draftThunks from '../../redux/thunks/draft';
import * as diseasesThunks from '../../redux/thunks/diseases';
import StatusDraft from '../StatusDraft/StatusDraft';
import { NextState } from '../NextState/NextState';
import AssociationForm from '../AssociationForm/AssociationForm';
import Associations from '../Associations/Associations';
import * as diseaseThunks from '../../redux/thunks/disease';
import * as nextStatesThunks from '../../redux/thunks/nextStates';
import * as patientThunks from '../../redux/thunks/patient';

export class States extends React.Component {
    constructor(props){
        super(props);
        this.updatePatientStatusData = this.updatePatientStatusData.bind(this);
    }
    componentDidMount () {
        this.props.getDiseases();
    }

    async componentWillReceiveProps (nextProps) {
        const { patientId, status } = nextProps;

        if (!patientId || patientId === this.props.patientId) {
            return;
        }

        if (status && this.props.status && status.state.id === this.props.status.state.id) {
            return;
        }
        await this.updatePatientStatusData(patientId);
    }
    async updatePatientStatusData (patientId)  {
        await this.props.getPatient(patientId);
        try {
            await this.props.getDraft(patientId);
        } catch (e) {
            const draftInitData = {
                stateId: this.props.status.state.id,
                medicines: [],
                attributes: []
            };
            await this.props.createDraft(patientId, draftInitData);
        }

        console.log('DRAFT', this.props.draft);

        await this.props.getDisease(patientId);

        console.log('GET diseaseData', this.props.disease);

        await this.props.getNextStates(patientId);
    }
    confirmState = (state) => {
        this.props.updateState(state);
    };

    associationData = () => {
        return {
            predicate: `eq(\${statusId}, ${this.props.status.id})`,
            type: 'state'
        };
    };

    render () {
        const { status, nextStates } = this.props;

        return (
            <React.Fragment>
                {status && (<section className="States">
                    <div className="States-PrevWrap States-Wrap">
                        <div className="States-Prev">
                            <AssociationForm getData={this.associationData} />
                            <h2 className='States-Heading'>Текущее состояние</h2>
                            <p>name: {status.state.name}</p>
                            <p>description: {status.state.description}</p>
                            <p>updated on: {status.submittedOn}</p>
                            {status.attributes && status.attributes.map(attribute =>
                                <p key={attribute.id} >{attribute.name} - {attribute.value}</p>)}
                        </div>
                    </div>
                    <div className="States-DraftWrap States-Wrap">
                        <StatusDraft updatePatientStatusData={this.updatePatientStatusData}/>
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
        updateState: draftThunks.updateState,
        getDiseases: diseasesThunks.get,
        getDisease: diseaseThunks.get,
        getNextStates: nextStatesThunks.get,
        getPatient: patientThunks.get


    }
)(States);
