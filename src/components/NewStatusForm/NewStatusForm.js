import React from 'react';
import { Form, Button, Select } from 'semantic-ui-react';
import './NewStatusForm.css';

const options = [
    { key: '1', text: 'type1', value: 'type1' },
    { key: '2', text: 'type2', value: 'type2' }
];

export default class NewStatusForm extends React.Component {
    render () {
        return (
            <section className="NewStatus">
                <Form className="NewStatus-Form">
                    <Form.Group inline>
                        <Form.Field>
                            <Form.Field
                                control={Select}
                                label='Analysis or symptom'
                                options={options}
                                placeholder='data'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Result</label>
                            <input/>
                        </Form.Field>
                        <Button type='submit' basic color='green' >Submit</Button>
                    </Form.Group>
                </Form>
            </section>
        );
    }
}
