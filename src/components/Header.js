import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
    return (
        <header className="header">
            <div className="header-text">
                {props.headerMessage}
            </div>
        </header>
    )
};

Header.propTypes = {
    headerMessage: PropTypes.string,
};

export default Header;