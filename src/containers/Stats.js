import {connect} from 'react-redux';
import Stats from '../components/Stats';

const mapStateToProps = (state) => ({
    playerStats: state.stats,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getHighscore: () => dispatch({
            type: 'FETCH_HIGHSCORE',
        }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);