import {Component} from "react";
import './States.css';
import React from "react";

export default class States extends Component {
    render() {
        return (
            <section className="States">
                <div className="States-Prev"><h2 className='States-Heading'>Previous State</h2></div>
                <div className="States-Current">
                    <div className="States-Current-State"><h2 className='States-Heading'>Current State</h2></div>
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
