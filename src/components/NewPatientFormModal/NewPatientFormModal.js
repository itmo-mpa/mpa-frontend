import React, {Component} from 'react';
import {Modal, Button, Form, Select} from 'semantic-ui-react';

export default class NewPatientForm extends Component {

  render () {
    return (
      <Modal trigger={<Button>Add patient</Button>}>
        <Modal.Header>Add new patient</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input type="text" name="name" />
            </Form.Field>
            <Form.Field>
              <label>Gender</label>
              
            </Form.Field>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }

}
