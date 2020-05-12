/* eslint-disable no-sequences */
import React, { Component } from 'react';
import { Button, Form, Icon, Modal, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as adrsThunks from '../../redux/thunks/adrs';
import './Adr.css';
import AdrScale from './AdrScale/AdrScale';

export class Adr extends Component {
  state = {
      text: 'null',
      showModal: false
  };

  closeModal = () => {
      this.setState({ showModal: false });
  };

  componentDidMount () {
      window.store = this.props;
  }

  render () {
      const { position, style = {} } = this.props;
      const { text, showModal } = this.state;
      if (typeof (this.props.adrs[this.props.medicineId]) === 'undefined') {
          this.props.getAdr(this.props.medicineId);
      }

      let iconClassName = 'Adr-Icon';
      switch (position) {
      case 'right':
          iconClassName += ' Adr-Icon_right';
          break;
      default:
          iconClassName += ' Adr-Icon_left';
      }

      return (
          <Modal
              trigger={
                  <span onClick={() => {
                      window.store = this.props;
                      this.setState({ showModal: true });
                      window.store = this.props;
                  }}>
                      <Icon name='list ul' className={iconClassName} style={style} />
                  </span>
              }
              open={showModal}
              onClose={this.closeModal}
          >
              <Modal.Header>Побочные реакции</Modal.Header>
              <Modal.Content>
                  {this.props.adrs[this.props.medicineId] && this.props.adrs[this.props.medicineId].map(adr => {
                      let scaleTypeForOccurenceFrequencyReverseCopy = {
                          ...adr.scaleTypeForOccurenceFrequency,
                          namesFromScale: [...adr.scaleTypeForOccurenceFrequency.namesFromScale]
                      };
                      scaleTypeForOccurenceFrequencyReverseCopy.namesFromScale.reverse();

                      return (
                          <div>
                              <h2>{adr.name}</h2>
                              <AdrScale scale={adr.scaleTypeForTheSeverityOfTheClinicalCourse} value={adr.theSeverityOfTheClinicalCourse} />
                              {/* Fixing reversed direction of second scale */}
                              <AdrScale scale={scaleTypeForOccurenceFrequencyReverseCopy}
                                  value={scaleTypeForOccurenceFrequencyReverseCopy.namesFromScale.length - 1 - adr.frequencyOfOccurence} />
                              <h3>Активные вещества, которые могут вызвать реакцию</h3>
                              <div>{adr.activeSubstances.map((name, id) => (id ? ', ' + name : name))}</div>
                              <br/>
                          </div>
                      );
                  })}
              </Modal.Content>
          </Modal>
      );
  }
}

export default connect(
    store => ({
        adrs: store.adrs
    }),
    {
        getAdr: adrsThunks.get
    }
)(Adr);
