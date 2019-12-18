import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import './FileUploader.css';
import StatusDraftContainer from '../StatusDraft/StatusDraft';

export class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false,
                  file: '',
                  fileName: ''
                };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  closeModal = () => {
      this.setState({ isModalOpen: false });
  }

  handleSubmit(event) {
    this.setState({file: this.fileInput.current.files[0],
                  isModalOpen: false,
                  fileName: this.fileInput.current.files[0].name
                });
    event.preventDefault();
  }
      
  render() {
    return (
      <div>
        <p>{this.state.fileName}</p>
        <Modal
        trigger={
          <button onClick={() => { this.setState({ isModalOpen: true }); }}>Загрузить данные о проведенных процедурах</button>
              }
          open={this.state.isModalOpen}
          onClose={this.closeModal}
        >
          <h3>Данные о проведенных процедурах</h3>
          <select>
            <option>ПЭТ</option>
            <option>МРТ</option>
          </select>
          <form onSubmit={this.handleSubmit}>
            <input className="fileInput" 
            type="file"
            ref={this.fileInput}
            />
          <button className="submitButton" 
            type="submit"
            >Загрузить файл</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default FileUploader;
