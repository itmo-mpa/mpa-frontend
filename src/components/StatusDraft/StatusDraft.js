import React from 'react';
import NewStatusForm from '../NewStatusForm/NewStatusForm';
import './StatusDraft.css';
import {Button, Divider} from "semantic-ui-react";

export default class StatusDraft extends React.Component {
    state = {};

    componentDidMount () {
        // временнный костыль
        this.setState({
            description: 'test status description'
        });
    }

    render () {
        const { description } = this.state;
        return (
            <div className="States-Draft Draft">
                <h2 className='States-Heading'>State Draft</h2>
                <p>
                    description: {description}
                </p>
                <Divider fitted />
                <NewStatusForm/>
                <Divider fitted />
                <br/>
                <Button type="submit" fluid positive>Save draft</Button>
            </div>
        );
    }
}
