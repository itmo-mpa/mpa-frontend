import React from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Icon, Select } from 'semantic-ui-react';
import NewStatusForm from '../NewStatusForm/NewStatusForm';
import './StatusDraft.css';
import AssociationForm from '../AssociationForm/AssociationForm';
import * as draftThunks from '../../redux/thunks/draft';
import * as nextStatesThunks from '../../redux/thunks/nextStates';
import * as diseaseThunks from '../../redux/thunks/disease';
import * as medicinesThunks from '../../redux/thunks/medicines';
import store from '../../redux';

export class StatusDraft extends React.Component {
    state = {
        symptomsAmount: 1,
        medicinesAmount: 1
    };

    async componentDidMount () {
        const { patient } = this.props.patient;
        const patientId = patient && patient.id;
        if (patientId) {
            await this.updatePatientDraftData(patientId);
        }
    }

    async updatePatientDraftData (patientId) {
        await this.props.getDraft(patientId);

        console.log('DRAFT', this.props.draft);

        await this.props.getDisease(patientId);

        console.log('GET diseaseData', this.props.disease);

        await this.props.getNextStates(patientId);
    }

    async componentWillReceiveProps (nextProps) {
        const { patient } = this.props;
        const patientId = patient && patient.id;

        if (patientId === this.props.patient.id) {
            return;
        }

        await this.props.getNextStates(patientId);

        const diseaseId = this.props.diseases.find(disease => disease.name === patient.diseaseName).id;

        await this.props.getMedicines(diseaseId);
    }

    getAssociationData = () => {
        return {
            predicate: `eq(\${draftId}, ${this.props.draft.id})`,
            type: 'draft'
        };
    };

    onPlusClick = (name) => () => {
        switch (name) {
        case 'attribute':
            this.setState({
                symptomsAmount: this.state.symptomsAmount + 1
            });
            break;

        case 'medicine':
            this.setState({
                medicinesAmount: this.state.medicinesAmount + 1
            });
            break;
        default:
        }
    };

    onDraftSubmit = async () => {
        const { id } = this.props.patient;
        await this.onDraftUpdate();
        await this.props.commitDraft(id);
        alert('saved!');
        await this.updatePatientDraftData(id);
    };

    onDraftUpdate = async (attribute, medicineId) => {
        const { patient, draft, medicines } = this.props;
        const status = patient.status;
        const state = draft.state || status.state;
        if (draft && draft.attributes && attribute) {
            let updated = false;
            draft.attributes.map((attr) => {
                if (attr.id === attribute.id) {
                    updated = true;
                    attr.value = attribute.value;
                }
                return attr;
            });
            if (!updated) draft.attributes.push(attribute);
        }

        if (medicineId && !draft.medicines.find(m => m.id === medicineId)) {
            draft.medicines = [
                ...draft.medicines,
                medicines.find(m => m.id === medicineId)
            ];
        }

        const data = {
            attributes: (draft && draft.attributes) || [],
            medicines: (draft && draft.medicines) || [],
            stateId: (state && state.id) || draft.stateId
        };

        await this.props.createDraft(patient.id, data);
        await this.props.getNextStates(patient.id);
    };

    render () {
        const { patient, draft, disease, medicines } = this.props;
        const status = (patient && patient.status) || {};
        const currentState = draft.state || status.state;
        let attributes = draft.attributes || [];
        let currentMedicines = draft.medicines || [];

        const { symptomsAmount, medicinesAmount } = this.state;
        let diseaseData = disease.filter(diseaseItem => {
            return !attributes.some(attribute => attribute.id === diseaseItem.id);
        });
        console.log('STORE', store.getState());

        return (
            <div className='States-Draft Draft'>
                <AssociationForm getData={this.getAssociationData}/>
                <h2 className='States-Heading'>Черновик состояния</h2>
                <p>
                    last updated: {status.submittedOn}
                </p>
                {currentState && <div>
                    <p>Текущее состояние</p>
                    <p>state name: {currentState.name}</p>
                    <p>
                        description:{currentState.description}
                    </p>
                    <p>
                        medicines: {JSON.stringify(currentMedicines)}
                    </p>
                </div>
                }
                <Divider fitted/>
                {attributes && attributes.map(attribute => (
                    <NewStatusForm
                        key={attribute.id}
                        patientId={patient.id}
                        statusId={status.id}
                        onDraftUpdate={this.onDraftUpdate}
                        diseaseData={[attribute]}
                        attribute={attribute}
                    />
                ))}
                {diseaseData && new Array(symptomsAmount).fill(true).map((el, index) =>
                    <div className='Draft-StatusFormContainer' key={index}>
                        {index === symptomsAmount - 1 &&
                        <Icon
                            name='plus circle'
                            color='green'
                            size='large'
                            className='Draft-PlusButton'
                            onClick={this.onPlusClick('attribute')}
                        />
                        }
                        <NewStatusForm
                            className={index < symptomsAmount - 1 ? 'Draft-StatusForm--Margined' : ''}
                            patientId={patient.id}
                            statusId={status.id}
                            onDraftUpdate={this.onDraftUpdate}
                            diseaseData={diseaseData}
                        />
                    </div>
                )}
                <Divider fitted/>
                {medicines.length > 0 && new Array(medicinesAmount).fill(true).map((el, index) =>
                    <div className='Draft-StatusFormContainer' key={index}>
                        {index === medicinesAmount - 1 &&
                        <Icon
                            name='plus circle'
                            color='green'
                            size='large'
                            className='Draft-PlusButton'
                            onClick={this.onPlusClick('medicine')}
                        />
                        }
                        <Select
                            placeholder='Лекарство'
                            options={medicines.map(medicine => ({
                                value: medicine.id,
                                key: medicine.id,
                                text: medicine.name
                            }))}
                            onChange={(e, option) => this.onDraftUpdate(undefined, option.value)}
                        />
                    </div>
                )}
                <br/>
                <Button type="submit" fluid positive onClick={this.onDraftSubmit}>Сохранить черновик</Button>
            </div>
        );
    }
}

export default connect(
    store => ({
        draft: store.draft,
        disease: store.disease,
        diseases: store.diseases,
        patient: store.patient,
        medicines: [{ name: 'Analgin', id: 1 }] // store.medicines
    }),
    {
        getDraft: draftThunks.get,
        clearDraft: draftThunks.clear,
        commitDraft: draftThunks.commit,
        createDraft: draftThunks.create,
        getNextStates: nextStatesThunks.get,
        getDisease: diseaseThunks.get,
        getMedicines: medicinesThunks.get
    }
)(StatusDraft);
