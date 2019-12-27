import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {BrowserRouter} from 'react-router-dom';
import App from './App/index';
import { applyMiddleware } from 'redux';
import reducer from './store/reducers/reducer';
import recordsReducer from './store/reducers/records';
import config from './config';

const globalReducer = combineReducers({
    theme: reducer,
    records: recordsReducer
});
const store = createStore(reducer, undefined, applyMiddleware(thunk));

const app = (
    <Provider store={store}>
        <BrowserRouter basename={config.basename}>
            {/* basename="/datta-able" */}
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));


