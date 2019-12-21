import React, { Component } from 'react';
import { Button, Form, Modal, Select } from 'semantic-ui-react';
import './ProcedureDataUploader.css';

export class ProcedureDataUploader extends Component {
    fileInput = React.createRef();
    state = {
        isModalOpen: false,
        isAnalysisModalOpen: false,
        file: '',
        fileName: ''
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    }
    closeAnalysisModal = () => {
        this.setState({ isAnalysisModalOpen: false });
    }

    handleSubmit = (event) => {
        if (!this.fileInput.current.files[0]) {
            return;
        }

        this.setState({
            file: this.fileInput.current.files[0],
            isAnalysisModalOpen: true,
            fileName: this.fileInput.current.files[0].name
        });
        event.preventDefault();
    }

    render () {
        return (
            <div>
                <p>{this.state.fileName}</p>
                <Modal className="Data-Input-Modal"
                    trigger={
                        <Button
                            primary
                            onClick={() => {
                                this.setState({ isModalOpen: true });
                            }}
                        >
                            Загрузить данные о проведенных процедурах
                        </Button>
                    }
                    open={this.state.isModalOpen}
                    onClose={this.closeModal}
                >
                    <h3>Данные о проведенных процедурах</h3>
                    <p>Выберите тип процедуры:</p>
                    <Select
                        options={[
                            { value: 'ПЭТ', key: 'ПЭТ', text: 'ПЭТ' },
                            { value: 'МРТ', key: 'МРТ', text: 'МРТ' }
                        ]}
                    />
                    <Form onSubmit={this.handleSubmit}>
                        <input className="Input-Field"
                            type="file"
                            ref={this.fileInput}
                        />
                        <Modal className="Analysis-Info"
                            trigger={
                                <Button type="submit" onClick={() => {
                                    this.setState({ isAnalysisModalOpen: true });
                                }}>Загрузить файл</Button>
                            }
                            open={this.state.isAnalysisModalOpen}
                            onClose={this.closeAnalysisModal}
                        >
                            <Form>
                                <p>По данным МРТ вероятноть наличия рассеянного склероза составляет 87%</p>
                                <Button type="submit" onClick={() => {
                                    this.setState({ isAnalysisModalOpen: false });
                                }}>Закрыть</Button>
                            </Form>
                        </Modal>
                        <Button type="submit" onClick={() => {
                            this.setState({ isModalOpen: false });
                        }}>Закрыть</Button>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default ProcedureDataUploader;
