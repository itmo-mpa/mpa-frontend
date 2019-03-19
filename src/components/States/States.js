import {Component} from "react";
import './States.css';
import React from "react";

export default class States extends Component {
    render() {
        return (
            <section className="States">
                <article className="States-Prev"><h2 className='States-Heading'>Previous State</h2></article>
                <div className="States-Current">
                    <article className="States-Current-State"><h2 className='States-Heading'>Current State</h2></article>
                    <article className="States-Current-Status"><h2 className='States-Heading'>Current Status</h2></article>
                </div>
                <div className="States-Next">
                    <article className="States-Next-State">
                        <h2 className='States-Heading'>Next State</h2>
                    </article>
                    <article className="States-Next-State">
                        <h2 className='States-Heading'>Next State</h2>
                    </article>
                    <article className="States-Next-State">
                        <h2 className='States-Heading'>Next State</h2>
                    </article>
                </div>
            </section>
        );
    }
}
