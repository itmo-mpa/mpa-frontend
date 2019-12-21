import React from 'react';
import { connect } from 'react-redux';
import { Dimmer, Divider, Loader, Select } from 'semantic-ui-react';
import NewStatusForm from '../NewStatusForm/NewStatusForm';
import AssociationForm from '../AssociationForm/AssociationForm';
import * as patientThunks from '../../redux/thunks/patient';
import * as draftThunks from '../../redux/thunks/draft';
import * as nextStatesThunks from '../../redux/thunks/nextStates';
import * as diseaseThunks from '../../redux/thunks/disease';
import { toast } from 'react-semantic-toasts';
import './StatusDraft.css';

export class StatusDraftContainer extends React.Component {
    state = {
        symptomsAmount: 1,
        medicinesAmount: 1,
        disableSubmit: false
    };

    componentDidMount () {
        const { patient } = this.props;

        this.props.updatePatientStatusData(patient.id);
    }

    componentWillReceiveProps (nextProps) {
        const { draft } = nextProps;

        this.setState({
            symptomsAmount: 1,
            medicinesAmount: draft.medicines && draft.medicines.length > 0 ? draft.medicines.length : 1
        });
    }

    getAssociationData = () => {
        return {
            predicate: `eq({status.state.id}, ${this.props.draft.state.id})`,
            type: 'state'
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

    onDraftSubmit = async (data) => {
        this.setState({ disableSubmit: true });

        try {
            const { id } = this.props.patient;

            await this.props.commitDraft(id);
            await this.props.createDraft(id, data);
            await this.props.updatePatientStatusData(id);

            toast({
                type: 'success',
                icon: 'save',
                title: 'Черновик сохранен',
                animation: 'bounce',
                time: 5000
            });
        } catch (e) {
            console.error(e);

            toast({
                type: 'error',
                icon: 'save',
                title: 'Ошибка при сохраненении',
                animation: 'bounce',
                time: 3000
            });
        }

        this.setState({ disableSubmit: false });
    };

    onDraftUpdate = async (attribute, medicineId) => {
        await this.setState({
            loading: true
        });

        const { patient, draft } = this.props;
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

        if (medicineId) {
            draft.medicines = [
                ...draft.medicines,
                medicineId
            ];
        }

        console.log('DRAFT UPDATED', draft);

        const data = {
            attributes: (draft && draft.attributes) || [],
            medicines: (draft && draft.medicines.map(m => m.id ? m.id : m)) || [],
            stateId: (state && state.id) || draft.stateId
        };

        await this.props.createDraft(patient.id, data);
        await this.onDraftSubmit(data);
        await this.props.getNextStates(patient.id);
        await this.props.getDraft(patient.id);
        await this.props.getPatient(patient.id);

        await this.setState({
            loading: false
        });
    };

    render () {
        const { patient, draft, disease, medicines } = this.props;
        const status = (patient && patient.status) || {};
        const currentState = draft.state || status.state;
        let attributes = draft.attributes || [];
        let currentMedicines = draft.medicines || [];

        let notYetChosenAttributes = disease.filter(diseaseItem => {
            return !attributes.some(attribute => attribute.id === diseaseItem.id);
        });
        let alreadyChosenAttributes = disease.filter(diseaseItem => {
            return attributes.some(attribute => attribute.id === diseaseItem.id);
        });

        let notYetChosenMedicines = medicines.filter(m => !currentMedicines.some(current => current.id === m.id));

        return (
            <div className='States-Draft Draft'>
                <Dimmer.Dimmable blurring dimmed={this.props.loading || this.state.loading}>
                    <Dimmer active={this.props.loading || this.state.loading} inverted>
                        <Loader/>
                    </Dimmer>
                    <AssociationForm getData={this.getAssociationData}/>
                    <h2 className='States-Heading'>Черновик состояния</h2>
                    <time className='Draft-UpdatedOn'>
                        Updated on: {status.submittedOn}
                    </time>
                    {currentState &&
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <p><b>Текущее состояние</b></p>
                        <p>state name: {currentState.name}</p>
                        <p>
                            description: {currentState.description}
                        </p>
                        {(currentMedicines.length !== 0 || notYetChosenMedicines.length !== 0) && <h3>Лекарства</h3>}
                        {
                            currentMedicines.length !== 0 && currentMedicines.map((medicine, index) => (
                                <div className='Draft-StatusFormContainer' key={index}>
                                    <Select
                                        placeholder='Лекарство'
                                        options={currentMedicines.map(medicine => ({
                                            value: medicine.id,
                                            key: medicine.id,
                                            text: medicine.name
                                        }))}
                                        value={currentMedicines[index] ? currentMedicines[index].id : undefined}
                                        disabled
                                    />
                                    <AssociationForm
                                        style={{ position: 'relative' }}
                                        getData={() => ({
                                            predicate: `eq({medicine.id}, ${currentMedicines[index]})`,
                                            type: 'medicine'
                                        })}
                                    />
                                </div>
                            ))
                        }
                        {
                            notYetChosenMedicines.length > 0 && (
                                <div className='Draft-StatusFormContainer'>
                                    <Select
                                        placeholder='Лекарство'
                                        options={notYetChosenMedicines.map(medicine => ({
                                            value: medicine.id,
                                            key: medicine.id,
                                            text: medicine.name
                                        }))}
                                        onChange={(e, option) => this.onDraftUpdate(undefined, option.value)}
                                    />
                                </div>
                            )
                        }
                    </div>
                    }
                    <Divider/>
                    <div style={{ position: 'relative' }}>
                        {attributes && attributes.map(attribute => (
                            <NewStatusForm
                                key={attribute.id}
                                patientId={patient.id}
                                statusId={status.id}
                                onDraftUpdate={this.onDraftUpdate}
                                diseaseData={alreadyChosenAttributes.filter(attr => attr.id === attribute.id)}
                                attribute={attribute}
                                // disabled
                            />
                        ))}
                        {
                            notYetChosenAttributes &&
                            <NewStatusForm
                                patientId={patient.id}
                                statusId={status.id}
                                onDraftUpdate={this.onDraftUpdate}
                                diseaseData={notYetChosenAttributes}
                            />
                        }
                    </div>
                </Dimmer.Dimmable>
            </div>
        );
    }
}

export const StatusDraft = connect(
    store => ({
        draft: store.draft,
        disease: store.disease,
        patient: store.patient,
        medicines: store.medicines
    }),
    {
        getPatient: patientThunks.get,
        getDraft: draftThunks.get,
        clearDraft: draftThunks.clear,
        commitDraft: draftThunks.commit,
        createDraft: draftThunks.create,
        getNextStates: nextStatesThunks.get,
        getDisease: diseaseThunks.get
    }
)(StatusDraftContainer);
