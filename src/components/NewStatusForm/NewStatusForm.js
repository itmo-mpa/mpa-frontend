import React from 'react';
import { Form, Button, Select, Input } from 'semantic-ui-react';
import './NewStatusForm.css';

export default class NewStatusForm extends React.Component {
    state = {
        healthMatter: '',
        result: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { onDraftUpdate } = this.props;
        const { healthMatter, result } = this.state;
        onDraftUpdate({
            [healthMatter]: result
        });
    };

    onHMChange = (e, { value }) => this.setState({ healthMatter: value });

    onResultChange = (event) => this.setState({
        // ...this.state,
        result: event.target.value
    });

    render () {
        const { className, diseaseData } = this.props;
        const { healthMatter, result } = this.state;

        const options = diseaseData && diseaseData.map(attr => {
            return {
                key: attr.id,
                text: attr.name,
                value: attr.id
            };
        });
        return (
            <section className={`NewStatus ${className || ''}`}>
                {options && <Form className="NewStatus-Form" onSubmit={this.handleSubmit}>
                    <Form.Group inline>
                        <Form.Field className='NewStatus-Field'>
                            <Form.Select
                                label='Analysis or symptom'
                                options={options}
                                placeholder='data'
                                value={healthMatter}
                                onChange={this.onHMChange}
                            />
                        </Form.Field>
                        <Form.Field className='NewStatus-Field'>
                            <Form.Field
                                control={Input}
                                label='Result'
                                value={result}
                                onChange={this.onResultChange}
                            />
                        </Form.Field>
                        <Button type='submit' basic color='green'>Submit</Button>
                    </Form.Group>
                </Form>}
            </section>
        );
    }
}
