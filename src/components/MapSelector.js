import React from 'react';
import PropTypes from 'prop-types';
import mapModesConsts from '../consts/mapModes';

const MapSelector = (props) => {
    return (
        <form className="map-selector">
            <span>Map mode:</span>
            <select onChange={props.changeMap}>
                {
                    Object.keys(mapModesConsts).map((mode, i) => {
                        return <option key={`mode_${i}`}>{mapModesConsts[mode]}</option>
                    })
                }
            </select>
        </form>
    )
};

MapSelector.propTypes = {
    changeMap: PropTypes.func,
};

export default MapSelector;