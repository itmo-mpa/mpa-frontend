import React, { Component } from 'react';
import { Button, Form, Icon, Modal, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './AssociationForm.css';
import * as associationsThunks from '../../redux/thunks/associations';

export class AssociationForm extends Component {
  state = {
      text: '',
      showModal: false
  };

  onSubmit = () => {
      if (typeof this.props.getData !== 'function') {
          console.warn('getData method is not provided');
      }

      const { predicate, type } = this.props.getData();
      const text = this.state.text;

      this.props.create({
          predicate,
          text,
          associationType: type
      });

      this.closeModal();
  };

  closeModal = () => {
      this.setState({ showModal: false });
  };

  render () {
      const { position, style = {} } = this.props;
      const { text, showModal } = this.state;

      let iconClassName = 'AssociationForm__Icon';

      switch (position) {
      case 'right':
          iconClassName += ' AssociationForm__Icon--right';
          break;
      default:
          iconClassName += ' AssociationForm__Icon--left';
      }

      return (
          <Modal
              trigger={
                  <span onClick={() => { this.setState({ showModal: true }); }}>
                      <Icon name='sticky note outline' className={iconClassName} style={style} />
                  </span>
              }

              open={showModal}
              onClose={this.closeModal}
          >
              <Modal.Header>Add association</Modal.Header>
              <Modal.Content>
                  <Form>
                      <Form.Field control={TextArea} value={text} onChange={(e) => { this.setState({ text: e.target.value }); }} />
                  </Form>
              </Modal.Content>
              <Modal.Actions>
                  <Button positive icon='checkmark' content="Save" onClick={this.onSubmit} />
              </Modal.Actions>
          </Modal>
      );
  }
}

export default connect(
    null,
    {
        create: associationsThunks.create
    }
)(AssociationForm);
