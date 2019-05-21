import React from 'react';
import { Button, Label } from 'semantic-ui-react';
import './NextState.css';
import AssociationForm from '../AssoсiationForm/AssociationForm';

export const NextState = (props) => (
    <div className="States-NextState NextState">
        <AssociationForm position='right' getData={() => `eq($StatusId, ${props.id})`} />
        <Label className="NextState-Label"
            color={props.recommended ? 'green' : 'red'} tag>
            {props.recommended ? 'recommended' : 'not recommended'}
        </Label>
        <div className="NextState-Content">
            <h3 className='States-Heading'>
                {props.state.name}
            </h3>
            <p>description: {props.state.description}</p>
            {props.errorCause && <p>reason: {props.errorCause}</p>}
            <Button className="NextState-Button" basic color='teal'
                onClick={() => props.confirmState(props.state)}>Confirm</Button>
        </div>
    </div>
);
