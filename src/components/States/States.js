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
import * as medicinesThunks from '../../redux/thunks/medicines';
import * as patientThunks from '../../redux/thunks/patient';

export class States extends React.Component {
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

    updatePatientStatusData = async (patientId) => {
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


        await this.props.getDisease(patientId);
        await this.props.getNextStates(patientId);

        const diseaseId = this.props.diseases.find(disease => disease.name === this.props.diseaseName).id;

        await this.props.getMedicines(diseaseId);

        console.log('DRAFT', this.props.draft);
        console.log('GET diseaseData', this.props.disease);
    };

    confirmState = (state) => {
        this.props.updateState(state);
    };

    associationData = () => {
        return {
            predicate: `eq({status.state.id}, ${this.props.status.state.id})`,
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
                            {status.medicines.length !== 0 && <h3>Лекарства</h3>}
                            {status.medicines && status.medicines.map(medicine =>
                              <p key={medicine.id}>{medicine.name}</p>
                            )}
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
        diseaseName: store.patient.diseaseName,
        status: store.patient.status,
        diseases: store.diseases
    }),
    {
        getDraft: draftThunks.get,
        createDraft: draftThunks.create,
        clearDraft: draftThunks.clear,
        updateState: draftThunks.updateState,
        getDiseases: diseasesThunks.get,
        getDisease: diseaseThunks.get,
        getNextStates: nextStatesThunks.get,
        getPatient: patientThunks.get,
        getMedicines: medicinesThunks.get
    }
)(States);
