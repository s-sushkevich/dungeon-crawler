import {connect} from 'react-redux';
import ViewportSelector from '../components/ViewportSelector';

const mapStateToProps = (state) => ({
    map: state.game.map,
    playerY: state.game.playerCoordinateY,
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeViewport: (map,playerY, event) => dispatch({
            type: 'CHANGE_VIEWPORT',
            map,
            playerY,
            nextViewportSize: +(event.target.value),
        }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewportSelector);

