import React from 'react';
import config from '../db/config';
import PropTypes from 'prop-types';

const ViewportSelector = (props) => {
    return (
        <div className="viewport-selector">
            <span>Viewport size: </span>
            <select onChange={props.changeViewport.bind(null, props.map, props.playerY)}>
                {
                    config.viewportSizes.map((size, i) => {
                        return <option key={`size_${i}`}>{size}</option>
                    })
                }
            </select>
        </div>
    )
};

ViewportSelector.propTypes = {
    map: PropTypes.object,
    playerY: PropTypes.number,
};

export default ViewportSelector;