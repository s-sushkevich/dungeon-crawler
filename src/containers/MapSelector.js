import {connect} from 'react-redux';
import MapSelector from '../components/MapSelector';

const mapDispatchToProps = (dispatch) => ({
    changeMap: (event) => dispatch({
        type: 'CHANGE_MAP',
        payload: event.target.value,
    }),
});

export default connect(null, mapDispatchToProps)(MapSelector);