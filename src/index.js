import ReactDOM from 'react-dom';
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';

import highscoreSaga from './sagas/highscoreSaga';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers/index';

import App from './App';

import './styles/fonts.css';
import './styles/icons.css';
import './styles/style.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(highscoreSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
