import React from 'react';
import { Form, Button, Select, Input } from 'semantic-ui-react';
import './NewStatusForm.css';

const options = [
    { key: '1', text: 'type1', value: 'type1' },
    { key: '2', text: 'type2', value: 'type2' }
];

export default class NewStatusForm extends React.Component {
    render () {
        const {className} = this.props;

        return (
            <section className={`NewStatus ${className ? className : ''}`}>
                <Form className="NewStatus-Form">
                    <Form.Group inline>
                        <Form.Field className='NewStatus-Field'>
                            <Form.Field
                                control={Select}
                                label='Analysis or symptom'
                                options={options}
                                placeholder='data'/>
                        </Form.Field>
                        <Form.Field className='NewStatus-Field'>
                            <Form.Field
                              control={Input}
                              label='Result'
                            />
                        </Form.Field>
                        <Button type='submit' basic color='green' >Submit</Button>
                    </Form.Group>
                </Form>
            </section>
        );
    }
}
