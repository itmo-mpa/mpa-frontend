import React from 'react';
import { Button, Label } from 'semantic-ui-react';
import './NextState.css';

export const NextState = (props) => (
    <div className="States-NextState NextState">
        <Label className="NextState-Label"
            color={props.recommended ? 'green' : 'red'} tag>
            {props.recommended ? 'recommended' : 'not recommended'}
        </Label>
        <div className="NextState-Content">
            <h3 className='States-Heading'>
                {props.name}
            </h3>
            <p>description: {props.description}</p>
            <Button type='submit' className="NextState-Button" basic color='teal'>Confirm</Button>
        </div>
    </div>
);
