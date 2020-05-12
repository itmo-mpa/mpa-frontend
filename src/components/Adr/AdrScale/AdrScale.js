/* eslint-disable no-sequences */
import React from 'react';
import './AdrScale.css';

let AdrScale = (props) => {
    return (
        <div className='AdrScale AdrScale_margin'>
            <div className='AdrScale-Name AdrScale_margin'>{props.scale.name}</div>
            <div className='AdrScale-Graph AdrScale_margin'>
                {props.scale.namesFromScale.map((name, id) => {
                    let scaleClassName = 'AdrScale-Item';
                    if (id === props.value) {
                        scaleClassName += ' AdrScale-Item_active';
                    }
                    return <div className={scaleClassName}>{name}</div>;
                })}
            </div>
        </div>
    );
};

export default AdrScale;
