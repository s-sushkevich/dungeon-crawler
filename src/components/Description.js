import React from 'react';
import config from '../db/config';
import MapSelector from '../containers/MapSelector';

const Description = (props) => {
    return (
        <div className="description">
            <div className="description-block">
                <div className="description-text">
                    <p>Collect {config.skills} skills on the first level.</p>
                    <p>Collect {config.certificates} certificates on the second level.</p>
                    <p>Finally beat the boss on the third level.</p>
                    <p>Try to make as less steps as you can.</p>
                </div>
                <MapSelector/>
                <button onClick={props.onPlayClick}>Play game</button>
            </div>
        </div>
    )
};

export default Description;