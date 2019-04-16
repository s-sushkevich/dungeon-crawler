import {connect} from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = (state) => ({
    headerMessage: state.notifications.headerMessage,
});

export default connect(mapStateToProps)(Header);
