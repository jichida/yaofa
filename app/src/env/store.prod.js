/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import React from 'react';

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';


import reducer from '../reducers';
import DevTools from './devtools';

let initialState = {

};
const sagaMiddleware = createSagaMiddleware();
let configureStore = (initialState)=> {

    const store = createStore(
        reducer, initialState,
        compose(
            applyMiddleware(thunk,sagaMiddleware)
        )
    );

    return store;
}

const store = configureStore(initialState);

export {sagaMiddleware};
export default store;