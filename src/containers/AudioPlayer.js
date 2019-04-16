import {connect} from 'react-redux';
import AudioPlayer from '../components/AudioPlayer';

const mapStateToProps = (state) => ({
    isSoundOn: state.options.isSoundOn,
});

const mapDispatchToProps = (dispatch) => ({
    toggleSound: () => {
        dispatch({
            type: 'TOGGLE_SOUND',
        })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);