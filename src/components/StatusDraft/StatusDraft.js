import React from 'react';
import NewStatusForm from '../NewStatusForm/NewStatusForm';
import './StatusDraft.css';
import { Button, Divider, Icon } from 'semantic-ui-react';
import { commitDraft, createDraft, getDiseaseData, getDraft, getNextStates } from '../../Services/draftService';

export default class StatusDraft extends React.Component {
    state = {
        symptomsAmount: 1
    };

    componentDidMount () {
        const { patientId, onNextStates } = this.props;
        if (patientId) {
            getDraft(patientId).then(draftData => {
                console.log('GET DRAFT', draftData);
                this.setState({
                    ...this.state,
                    draftData
                });
            });
            getDiseaseData(patientId).then(diseaseData => {
                console.log('GET diseaseData', diseaseData);

                this.setState({
                    ...this.state,
                    diseaseData
                });
            });
            getNextStates(patientId).then(nextStates => {
                console.log('GET next state', nextStates);
                onNextStates(nextStates);
            });
        }
    }

    onPlusClick = () => {
        this.setState({
            symptomsAmount: this.state.symptomsAmount + 1
        });
    };

    onDraftSubmit = () => {
        const { patientId } = this.props;
        this.onDraftUpdate();
        commitDraft(patientId);
        alert('saved!');
    };

    onDraftUpdate = (attribute) => {
        const { patientId, onNextStates, state } = this.props;
        let { draftData } = this.state;
        console.log('GET DRAFT', this.state);
        if(attribute) {
            draftData.attributes = {
                ...draftData.attributes,
                ...attribute
            };
        }
        this.setState({
            ...this.state,
            draftData
        });
        const data = {
            attributes: (draftData && draftData.attributes) || [],
            medicines: (draftData && draftData.medicines) || [],
            stateId: state.id
        };
        createDraft(patientId, data).then(data => console.log('upd draft', data))
            .then(getNextStates(patientId))
            .then(nextStates => {
                console.log('GET next state', nextStates);
                onNextStates(nextStates);
            });
    };

    render () {
        const { status, patientId, state } = this.props;
        const attributes = status.attributes || [];
        const { symptomsAmount, diseaseData } = this.state;

        return (
            <div className='States-Draft Draft'>
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
                            diseaseData={diseaseData}
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
