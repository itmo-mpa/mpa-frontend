import React from 'react';
import './States.css';
import { commitDraft, getDraft } from '../../Services/draftService';

export default class States extends React.Component {
    componentDidMount () {
        let { id } = this.props;
        // выпилить костыль позже
        if (!id) id = 1;
        getDraft(id).then(
            (draft) => {
                this.setState(draft);
                console.log('GET draft', draft);
                // выпилить костыль, когда можно будет создавать пациентов
            }, (error) => {
                const tempData = {
                    'name': 'wtf is this',
                    'description': '????'
                };
                commitDraft(id, tempData).then((res) => {
                    console.log('PUT(?) draft', res);
                });
            }
        );
    }

    render () {
        console.log(this.state);
        return (
            <section className="States">
                <div className="States-Prev"><h2 className='States-Heading'>Previous State</h2></div>
                <div className="States-Draft">
                    <div className="States-Current-State">
                        <h2 className='States-Heading'>State Draft</h2>
                        <p>
                            name: {this.state && this.state.name}
                        </p>
                        <p>
                            description: {this.state && this.state.description}
                        </p>
                    </div>
                    <div className="States-Current-Status"><h2 className='States-Heading'>Current Status</h2></div>
                </div>
                <div className="States-Next">
                    <div className="States-Next-State">
                        <h2 className='States-Heading'>Next State</h2>
                    </div>
                    <div className="States-Next-State">
                        <h2 className='States-Heading'>Next State</h2>
                    </div>
                    <div className="States-Next-State">
                        <h2 className='States-Heading'>Next State</h2>
                    </div>
                </div>
            </section>
        );
    }
}
