import React from 'react';

import Header from './containers/Header';
import Content from './containers/Content';

const App = (props) => {
    return (
        <div className="app">
            <Header/>
            <Content/>
        </div>
    );
};

export default App;

