import React from 'react';
import { Form } from 'semantic-ui-react';
import Button from 'semantic-ui-react/dist/es/elements/Button/Button';
import Select from 'semantic-ui-react/dist/es/addons/Select/Select';

const options = [
  { key: '1', text: 'type1', value: 'type1' },
  { key: '2', text: 'type2', value: 'type2' }
];

export default class NewStatusForm extends React.Component {
  render () {
    return (
      <section className="PatientInfo-NewStatus NewStatus">
        <Form className="NewStatus-Form">
          <Form.Field>
            <Form.Field control={Select} label='Analysis' options={options} placeholder='Analysis'/>
          </Form.Field>
          <Form.Field>
            <label>Result</label>
            <input/>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </section>
    );
  }
}
