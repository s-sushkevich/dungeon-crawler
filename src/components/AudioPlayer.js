import React from 'react';
import gamesound from '../media/audio/8 Bit Universe Cover.mp3';

class AudioPlayer extends React.Component {
    constructor() {
        super();
        this.playerRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isSoundOn !== this.props.isSoundOn) {
            this.props.isSoundOn ? this.playerRef.current.play() : this.playerRef.current.pause();
        }
    }

    render() {
        return (
            <div className="audio-player">
                <audio ref={this.playerRef} src={gamesound}></audio>
                <button onClick={this.props.toggleSound}>
                    {this.props.isSoundOn ? <span className="active">Sound on</span> : <span>Sound off</span>}
                </button>
            </div>
        )
    }
}

export default AudioPlayer;