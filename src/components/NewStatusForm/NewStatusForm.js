import React, { Fragment } from 'react';
import { Form, Input } from 'semantic-ui-react';
import './NewStatusForm.css';
import AssociationForm from '../AssociationForm/AssociationForm';

export default class NewStatusForm extends React.Component {
    state = {
        healthMatter: '',
        result: ''
    };

    componentDidMount () {
        this.updateState();
    }

    updateState () {
        const { attribute } = this.props;

        if (!attribute || !attribute.id) {
            this.setState({
                healthMatter: '',
                result: ''
            });
        } else {
            this.setState({
                healthMatter: attribute.id,
                result: attribute.value
            });
        }
    }

    handleSubmit = async () => {
        const { onDraftUpdate } = this.props;
        const { healthMatter, result } = this.state;

        if (!healthMatter || !result) {
            return;
        }

        const attribute = this.props.diseaseData.find(data => data.id === healthMatter);

        if (!attribute) {
            return;
        }

        const { name } = attribute;

        await onDraftUpdate(
            { id: healthMatter, value: result, name }
        );
    };

    onHMChange = async (e, { value }) => {
        await this.setState({ healthMatter: value });

        this.handleSubmit();
    };

    onResultChange = (event, formData) => {
        let value;

        switch (formData.type) {
        case 'checkbox':
            value = `${formData.checked}`;
            break;

        case 'number':
            value = +formData.value;
            break;

        default:
            value = formData.value;
        }

        this.setState({
            result: value
        });
    };

    getAssociationData = () => {
        return {
            predicate: `eq({status.${this.state.healthMatter}}, ${this.state.result})`,
            type: 'symptom'
        };
    };

    getResultFromType () {
        const props = {
            label: 'Result',
            value: this.state.result,
            onChange: this.onResultChange,
            onBlur: this.handleSubmit
        };

        const attributeData = this.props.diseaseData.find(attr => attr.id === this.state.healthMatter);

        switch (attributeData && attributeData.type) {
        case 'bool':
            props.label = 'Observed';
            props.defaultChecked = props.value ? JSON.parse(props.value) : false;

            props.onChange = async (...args) => {
                await this.onResultChange(...args);

                await this.handleSubmit();
            };

            delete props.onBlur;
            delete props.value;

            return (
                <Fragment>
                    <label>Result</label>
                    <Form.Checkbox {...props} />
                </Fragment>
            );

        case 'enum':
            const options = attributeData.possibleValues.map(
                ({ id, value }) => ({
                    key: value,
                    text: value,
                    value: value
                })
            );

            return (
                <Form.Select options={options} {...props} />
            );

        case 'double':
            return (
                <Form.Field
                    control={Input}
                    type='number'
                    {...props}
                />
            );

        default:
            return (
                <Form.Field
                    control={Input}
                    {...props}
                />
            );
        }
    }

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
                    <Form className="NewStatus-Form" onSubmit={(e) => { e.preventDefault(); this.handleSubmit(); }}>
                        <Form.Group widths='1'>
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
                                {this.getResultFromType()}
                            </Form.Field>
                            {healthMatter && !!result &&
                                <AssociationForm style={{ position: 'relative' }} getData={this.getAssociationData}/>
                            }
                        </Form.Group>
                    </Form>}
            </section>
        );
    }
}
