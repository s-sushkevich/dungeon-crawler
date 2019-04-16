import Content from '../components/Content';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    view: state.common.view
});

export default connect(mapStateToProps)(Content);
