import React from 'react';
import ViewportSelector from '../containers/ViewportSelector';
import AudioPlayer from '../containers/AudioPlayer';

const Options = (props) => {
    return (
        <div className="options-bar">
            <h3>Options</h3>
            <ViewportSelector/>
            <AudioPlayer/>
        </div>
    )
};

export default Options;