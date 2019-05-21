import React, {Component} from 'react';
import { Button, Form, Icon, Modal, TextArea } from 'semantic-ui-react';
import './AssociationForm.css';

export default class AssociationForm extends Component {

  onSubmit = () => {
    // const data = this.props.getData();

    // TODO: send API request
  };

  render () {
    const {position, style = {}} = this.props;

    let iconClassName = 'AssociationForm__Icon';

    switch (position) {
      case 'right':
        iconClassName += ' AssociationForm__Icon--right';
        break;
      default:
        iconClassName += ' AssociationForm__Icon--left';
    }

    return (
      <Modal trigger={
        <Icon name='sticky note outline' className={iconClassName} style={style} />}
      >
        <Modal.Header>Add association</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field control={TextArea} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button positive icon='checkmark' content="Save" onClick={this.onSubmit} />
        </Modal.Actions>
      </Modal>
    )
  }
}
