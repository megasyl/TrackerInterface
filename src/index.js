import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {BrowserRouter} from 'react-router-dom';
import App from './App/index';
import { applyMiddleware } from 'redux';
import reducer from './store/reducers/reducer';
import recordsReducer from './store/reducers/records';
import config from './config';
import Cookies from 'js-cookie';
import { createCookieMiddleware } from 'redux-cookie';
import { CookiesProvider } from 'react-cookie';

const globalReducer = combineReducers({
    theme: reducer,
    records: recordsReducer
});
const store = createStore(reducer, undefined, applyMiddleware(thunk, createCookieMiddleware(Cookies)));

const app = (
    <Provider store={store}>
        <BrowserRouter basename={config.basename}>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));


