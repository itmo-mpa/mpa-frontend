import React from 'react';
import { Modal, Button, Form, Select, Input } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

const genderOptions = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' }
];

export default class NewPatientForm extends React.Component {
    render () {
        return (
            <Modal trigger={<Button>Add patient</Button>}>
                <Modal.Header>Add new patient</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field label="Name" type="text" control={Input} />
                        <Form.Field label="Gender" control={Select} options={genderOptions} />
                        <Form.Field>
                            <label>Age</label>
                            <SemanticDatepicker onDateChange={() => {}} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive icon='checkmark' content="Save" />
                </Modal.Actions>
            </Modal>
        );
    }
}
