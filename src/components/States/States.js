import React from 'react';
import './States.css';
import { commitDraft, getDraft } from '../../Services/draftService';
import StatusDraft from '../StatusDraft/StatusDraft';
import { NextState } from '../NextState/NextState';

export default class States extends React.Component {
    state = {};

    componentDidMount () {
        let { id } = this.props;
        // выпилить костыли позже
        if (!id) id = 1;
        getDraft(id).then(
            (draft) => {
                this.setState(draft);
                console.log('GET draft', draft);
                // выпилить костыль, когда можно будет создавать пациентов
            }, (error) => { //eslint-disable-line
                const tempData = {
                    'description': 'S'
                };
                commitDraft(id, tempData).then((res) => {
                    console.log('PUT(?) draft', res);
                });
            }
        );
        this.setState({
            nextStates: [
                {
                    id: 1,
                    name: 'next state 1',
                    description: 'next state description',
                    recommended: true
                },
                {
                    id: 2,
                    name: 'next state 2',
                    description: 'next state description',
                    recommended: false
                },
                {
                    id: 3,
                    name: 'next state 3',
                    description: 'next state description',
                    recommended: false
                },
                {
                    id: 4,
                    name: 'next state 4',
                    description: 'next state description',
                    recommended: false
                }
            ]

        });
    }

    render () {
        const { nextStates } = this.state;
        return (
            <section className="States">
                <div className="States-PrevWrap States-Wrap">
                    <div className="States-Prev">
                        <h2 className='States-Heading'>Previous State</h2>
                        <p>тут что-то будет</p>
                    </div>
                </div>
                <div className="States-DraftWrap States-Wrap">
                    <StatusDraft/>
                </div>
                <div className="States-NextWrap States-Wrap">
                    <div className="States-Next">
                        {nextStates && nextStates.map(nextState =>
                            <NextState {...nextState} key={nextState.id}/>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}
