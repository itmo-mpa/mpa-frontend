import React from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
import './NewStatusForm.css';
import AssociationForm from '../AssociationForm/AssociationForm';

export default class NewStatusForm extends React.Component {
    state = {
        healthMatter: '',
        result: ''
    };

    componentDidMount () {
        const { attribute } = this.props;
        if (attribute) {
            this.setState({
                healthMatter: attribute.id,
                result: attribute.value
            });
        } else {
            this.setState({
                healthMatter: '',
                result: ''
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { onDraftUpdate } = this.props;
        const { healthMatter, result } = this.state;

        const name = this.props.diseaseData.find(data => data.id === healthMatter).name;

        onDraftUpdate(
            { id: healthMatter, value: result, name }
        );
    };

    onHMChange = (e, { value }) => this.setState({ healthMatter: value });

    onResultChange = (event) => this.setState({
        result: event.target.value
    });

    getAssociationData = () => {
        return {
            predicate: `eq({status.${this.state.healthMatter}}, ${this.state.result})`,
            type: 'symptom'
        };
    };

    render () {
        const { className, diseaseData } = this.props;
        let { healthMatter, result } = this.state;
        const options = diseaseData && diseaseData.map(attr => {
            return {
                key: attr.id,
                text: attr.name,
                value: attr.id
            };
        });

        return (
            <section className={`NewStatus ${className || ''}`}>

                {options &&
                    <Form className="NewStatus-Form" onSubmit={this.handleSubmit}>
                        <Form.Group inline>
                            <Form.Field className='NewStatus-Field'>
                                <Form.Select
                                    label='Analysis or symptom'
                                    options={options}
                                    placeholder='data'
                                    value={healthMatter}
                                    onChange={this.onHMChange}
                                    // disabled={disabled}
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
                            {healthMatter && result &&
                            <AssociationForm style={{ position: 'relative' }} getData={this.getAssociationData}/>}
                        </Form.Group>
                    </Form>}
            </section>
        );
    }
}
