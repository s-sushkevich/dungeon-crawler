import React from 'react';

import Header from './containers/Header';
import Content from './containers/Content';
import Hooks from './components/Hooks';

const App = (props) => {
    return (
        <div className="app">
            <Hooks/>
            <Header/>
            <Content/>
        </div>
    );
};

export default App;

