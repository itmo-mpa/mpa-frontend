import React, { Component } from 'react';
import { Button, Form, Modal, Select } from 'semantic-ui-react';
import './Predictions.css';
import { baseUrl } from '../../Services/fetchService';
import { post } from 'axios';

let stat = 0;

export class Prediction extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isAnalysisModalOpen: false,
            file: null,
            vstr: '',
            maxValue1: '',
            maxValue2: '',
            disease1: '',
            disease2: ''
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };
    closeAnalysisModal = () => {
        this.setState({ isAnalysisModalOpen: false });
    };

    async fileUpload (file) {
        const url = baseUrl + '/predictions';
        const formData = new FormData();
        formData.append('file', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return post(url, formData, config);
    }
    onChange (e) {
        this.setState({
            file: e.target.files[0]
        });
    }

    indexOfMax (arr) {
        if (arr.length === 0) {
            return -1;
        }

        let max = arr[0];
        let maxIndex = 0;

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }
        let newArr = arr.slice();
        newArr.splice({ maxIndex }, 1);
        let max2 = newArr[0];
        for (let i = 1; i < newArr.length; i++) {
            if (newArr[i] > max2) {
                max2 = newArr[i];
            }
        }
        let maxIndex2 = arr.indexOf(max2);
        return [maxIndex, max, maxIndex2, max2];
    }
    async onFormSubmit (e) {
        this.fileUpload(this.state.file)
            .then((response) => {
                if (response.status === 200) {
                    for (let [, value] of Object.entries(response.data)) {
                        this.setState({ vstr: `${value}` });
                        let arr = this.state.vstr.split(',');
                        let diseases = ['Неэктопические ритмы', 'Эктопические ритмы', 'Желудочковые не эктопические ритмы', 'Смешанные ритмы', 'Ритмы без классификации'];
                        this.setState({
                            maxValue1: this.indexOfMax(arr)[1] * 100,
                            disease1: diseases[this.indexOfMax(arr)[0]],
                            maxValue2: this.indexOfMax(arr)[3] * 100,
                            disease2: diseases[this.indexOfMax(arr)[2]]
                        }
                        );
                    }
                }
            })
            .then((response) => {
                if (response.headers['content-type'] !== 'application/json') {
                    let error = new Error('Некорректный ответ от сервера');
                    error.response = response;
                    throw error;
                }
                return response;
            })
            .then(response => response.json())
            .then(data => console.log('+', data))
            .catch((e) => {
                console.log('Error: ' + e.message + '.  Stat: ' + e.message[32]);
                stat = e.message[32];
                console.log(e.response);
            },
            this.setState({ maxValue1: '', maxValue2: '', disease1: '', disease2: '' }));
        e.preventDefault();
    }

    render () {
        const { maxValue1, maxValue2, disease1, disease2 } = this.state;
        return (
            <div>
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
                    {stat == 4 && <h2 style={{ color: 'red' }}> Выберете файл для загрузки </h2>}
                    {stat == undefined && <h2 style={{ color: 'red' }}> Не удалось загрузить файл </h2>}
                    {stat == 5 && <h2 style={{ color: 'red' }}> Выбран неправильный тип файла </h2>}
                    <Form onSubmit={this.onFormSubmit}>
                        <input className="Input-Field"
                            type="file"
                            onChange={this.onChange}
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
                                <p>Вероятность болезней:</p>
                                <p>{disease1} - {maxValue1}%,</p>
                                <p>{disease2} - {maxValue2}%.</p>
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

export default Prediction;
