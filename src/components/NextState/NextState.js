import React from 'react';
import { Button, Label } from 'semantic-ui-react';
import './NextState.css';
import AssociationForm from '../AssociationForm/AssociationForm';

function getLabel (recommended) {
    if (recommended === null) {
        return {
            color: 'orange',
            text: 'недостаточно информации'
        };
    } if (!recommended) {
        return {
            color: 'red',
            text: 'не рекомендуется'
        };
    }
    return {
        color: 'green',
        text: 'рекомендуется'
    };
}
export const NextState = (props) => (
    <div className="States-NextState NextState">
        <AssociationForm position='right' getData={() => ({ predicate: `eq({status.state.id}, ${props.id})`, type: 'state' })} />
        <Label className="NextState-Label"
            color={getLabel(props.recommended).color} tag>
            {getLabel(props.recommended).text}
        </Label>
        <div className="NextState-Content">
            <h3 className='States-Heading'>
                {props.state.name}
            </h3>
            <p>description: {props.state.description}</p>
            {props.errors && <div>
                errors:
                {props.errors.map((error, i) =>
                    <p key={i}>code: {error.code}, reason: {error.reason}</p>
                )}
            </div>
            }
            <Button className="NextState-Button" basic color='teal'
                onClick={() => props.confirmState(props.state)}>Confirm</Button>
        </div>
    </div>
);
