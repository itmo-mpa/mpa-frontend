import React from 'react';
import {connect} from 'react-redux';
import {Modal, Button, Form, Select, Input} from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import * as patientThunks from '../../redux/thunks/patient';

const genderOptions = [
    {key: 'm', text: 'Male', value: 'male'},
    {key: 'f', text: 'Female', value: 'female'}
];

export class NewPatientForm extends React.Component {
    savePatient = (event) => {
        event.preventDefault();
        const {name, birthDate } = this.state;
        const data = new FormData(event.target);
        const patientData = {
            name: name,
            birthDate: birthDate.toISOString().substring(0, 10),
            diseaseId: 1,
            doctorId: 1
        };

        this.props.create(patientData);
        alert('created');
    };

    handleOnChange = (value, attr) => this.setState({[attr]: value});

    render() {
        return (
            <Modal trigger={<Button>Add patient</Button>}>
                <Modal.Header>Add new patient</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field label="Name" type="text" control={Input}
                                    onChange={(event) => this.handleOnChange(event.target.value, 'name')}/>
                        {/*<Form.Field label="Gender" control={Select} options={genderOptions}*/}
                        {/*onChange={(event) => this.handleOnChange(event, 'gender')}/>*/}
                        <Form.Field>
                            <label>Age</label>
                            <SemanticDatepicker onDateChange={(date) => this.handleOnChange(date, 'birthDate')}/>
                        </Form.Field>
                    </Form>
                </Modal.Content>
                < Modal.Actions>
                    < Button
                        positive
                        icon='checkmark'
                        content="Save"
                        type='submit'
                        onClick={this.savePatient
                        }
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}

export default connect(
    null,
    {
        create: patientThunks.create
    }
)(NewPatientForm);
