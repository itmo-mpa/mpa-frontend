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
        const { patientId } = this.props;
        if (patientId) {
            await this.props.getDraft(patientId);

            console.log('DRAFT', this.props.draft);

            await this.props.getDisease(patientId);

            console.log('GET diseaseData', this.props.disease);

            await this.props.getNextStates(patientId);
        }
    }

    async componentWillReceiveProps (nextProps) {
        const { patientId } = nextProps;

        if (patientId === this.props.patientId) {
            return;
        }

        await this.props.getNextStates(patientId);

        const diseaseId = this.props.diseases.find(disease => disease.name === this.props.patient.diseaseName).id;

        await this.props.getMedicines(diseaseId);
    }

    getAssociationData = () => {
        return {
            predicate: `eq(\${draftId}, ${this.props.draft.id})`,
            type: 'draft'
        };
    }

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
        const { patientId } = this.props;
        await this.onDraftUpdate();
        await this.props.commitDraft(patientId);
        alert('saved!');
    };

    onDraftUpdate = async (attribute, medicineId) => {
        const { patientId, draft, status, medicines } = this.props;
        const state = draft.state || status.state;
        console.log('debug', this.props);
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

        await this.props.createDraft(patientId, data);
        await this.props.getNextStates(patientId);
    };

    render () {
        const { status, patientId, draft, disease, medicines } = this.props;
        const currentState = draft.state || status.state;
        let attributes = draft.attributes || [];
        let currentMedicines = draft.medicines || [];

        const { symptomsAmount, medicinesAmount } = this.state;
        let diseaseData = disease.filter(diseaseItem => {
            return !attributes.some(attribute => attribute.id === diseaseItem.id);
        });
        console.log('STORE', store.getState());
        console.log('state', this.props);

        return (
            <div className='States-Draft Draft'>
                <AssociationForm getData={this.getAssociationData} />
                <h2 className='States-Heading'>Черновик состояния</h2>
                <p>
                    last updated: {status.submittedOn}
                </p>
                { currentState && <div>
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
                        patientId={patientId}
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
                            patientId={patientId}
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
                <Button type="submit" fluid positive onClick={this.onDraftSubmit}>Save draft</Button>
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
