import React from 'react';
import { Button, Label } from 'semantic-ui-react';
import './NextState.css';
import AssociationForm from '../AssociationForm/AssociationForm';

export const NextState = (props) => (
    <div className="States-NextState NextState">
        <AssociationForm position='right' getData={() => `eq($StatusId, ${props.id})`} />
        <Label className="NextState-Label"
            color={props.recommended ? 'green' : props.recommended === null ? 'orange' : 'red'} tag>
            {props.recommended ? 'recommended' : props.recommended === null ? 'not enough info' : 'not recommended'}
        </Label>
        <div className="NextState-Content">
            <h3 className='States-Heading'>
                {props.state.name}
            </h3>
            <p>description: {props.state.description}</p>
            {props.errors.length && <p>errors: {JSON.stringify(props.errors, null, 2)}</p>}
            <Button className="NextState-Button" basic color='teal'
                onClick={() => props.confirmState(props.state)}>Confirm</Button>
        </div>
    </div>
);
