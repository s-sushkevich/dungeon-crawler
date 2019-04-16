import {connect} from 'react-redux';
import Description from '../components/Description';

const mapDispatchToProps = (dispatch) => {
    return {
        onPlayClick: () => {
            dispatch({
                type: 'GAME_STARTED',
            });
            dispatch({
                type: 'CLEAR_MESSAGE',
            })
        },
    };
};

export default connect(null, mapDispatchToProps)(Description);