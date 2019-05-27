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
        const { patientId, state, draft, medicines } = this.props;

        console.log(medicineId);

        if (attribute) {
            draft.attributes = [
                ...draft.attributes,
                attribute
            ];
        }

        if (medicineId && !draft.medicines.find(m => m.id === medicineId)) {
            draft.medicine = [
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
        const { status, patientId, state, disease, medicines } = this.props;
        const attributes = status.attributes || [];
        const currentMedicines = status.medicines || [];
        console.log(status);

        const { symptomsAmount, medicinesAmount } = this.state;

        return (
            <div className='States-Draft Draft'>
                <AssociationForm />
                <h2 className='States-Heading'>State Draft</h2>
                <p>
                    last updated: {status.submittedOn}
                </p>
                <p>
                    {JSON.stringify(state)}
                </p>
                <p>
                    {JSON.stringify(attributes)}
                </p>
                <p>
                    {JSON.stringify(currentMedicines)}
                </p>
                <Divider fitted/>
                {new Array(symptomsAmount).fill(true).map((el, index) =>
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
                            diseaseData={disease}
                        />
                    </div>
                )}
                <Divider fitted/>
                {medicines.length && new Array(medicinesAmount).fill(true).map((el, index) =>
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
        medicines: store.medicines
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
