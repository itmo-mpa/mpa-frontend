import React from 'react';
import {connect} from 'react-redux';
import { Button, Divider, Icon } from 'semantic-ui-react';
import NewStatusForm from '../NewStatusForm/NewStatusForm';
import './StatusDraft.css';
import AssociationForm from '../AssociationForm/AssociationForm';
import * as draftThunks from '../../redux/thunks/draft';
import * as nextStatesThunks from '../../redux/thunks/nextStates';
import * as diseaseThunks from '../../redux/thunks/disease';

export class StatusDraft extends React.Component {
    state = {
        symptomsAmount: 1
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

    onPlusClick = () => {
        this.setState({
            symptomsAmount: this.state.symptomsAmount + 1
        });
    };

    onDraftSubmit = async () => {
        const { patientId } = this.props;
        await this.onDraftUpdate();
        await this.props.commitDraft(patientId);
        alert('saved!');
    };

    onDraftUpdate = async (attribute) => {
        const { patientId, state, draft } = this.props;
        if (attribute) {
            draft.attributes = [
                ...draft.attributes,
                attribute
            ];
        }

        const data = {
            attributes: (draft  && draft.attributes) || [],
            medicines: (draft && draft.medicines) || [],
            stateId: state.id
        };

        await this.props.createDraft(patientId, data);
        await this.props.getNextStates(patientId);
    };

    render () {
        const { status, patientId, state, disease } = this.props;
        const attributes = status.attributes || [];
        const { symptomsAmount } = this.state;

        return (
            <div className='States-Draft Draft'>
                <AssociationForm />
                <h2 className='States-Heading'>State Draft</h2>
                <p>
                    last updated: {status.submittedOn}
                </p>
                {<p>
                    {JSON.stringify(state)}
                </p>
                }
                {<p>
                    {JSON.stringify(attributes)}
                </p>
                }
                <Divider fitted/>
                {new Array(symptomsAmount).fill(true).map((el, index) =>
                    <div className='Draft-StatusFormContainer' key={index}>
                        {index === symptomsAmount - 1 &&
                        <Icon
                            name='plus circle'
                            color='green'
                            size='large'
                            className='Draft-PlusButton'
                            onClick={this.onPlusClick}
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
                <br/>
                <Button type="submit" fluid positive onClick={this.onDraftSubmit}>Save draft</Button>
            </div>
        );
    }
}

export default connect(
    store => ({
        draft: store.draft,
        disease: store.disease
    }),
    {
        getDraft: draftThunks.get,
        clearDraft: draftThunks.clear,
        commitDraft: draftThunks.commit,
        createDraft: draftThunks.create,
        getNextStates: nextStatesThunks.get,
        getDisease: diseaseThunks.get
    }
)(StatusDraft)