import React from 'react';
import NewStatusForm from '../NewStatusForm/NewStatusForm';
import './StatusDraft.css';
import { Button, Divider, Icon } from 'semantic-ui-react';

export default class StatusDraft extends React.Component {
    state = {
      symptomsAmount: 1
    };

    componentDidMount () {
        // временнный костыль
        this.setState({
            description: 'test status description'
        });
    }

    onPlusClick = () => {
      this.setState({
        symptomsAmount: this.state.symptomsAmount + 1
      })
    };

    render () {
        const { description, symptomsAmount } = this.state;

        return (
            <div className='States-Draft Draft'>
                <h2 className='States-Heading'>State Draft</h2>
                <p>
                    description: {description}
                </p>
                <Divider fitted />
                {new Array(symptomsAmount).fill(true).map((el, index) =>
                  <div className='Draft-StatusFormContainer'>
                    {index === symptomsAmount - 1 &&
                      <Icon
                        name='plus circle'
                        color='green'
                        size='large'
                        className='Draft-PlusButton'
                        onClick={this.onPlusClick}
                      />
                    }
                    <NewStatusForm className={index < symptomsAmount - 1 ? 'Draft-StatusForm--Margined' : ''} />
                  </div>
                )}
                <Divider fitted />
                <br/>
                <Button type="submit" fluid positive>Save draft</Button>
            </div>
        );
    }
}
