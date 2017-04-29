/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import DevTools from './devtools';
import store from './store';

import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';


import AppRoot from '../approot.js';

let Root = (props)=>
    (
            <Provider store={store}>
                <div>
                    <Router>
                        <Route path="/" component={AppRoot}/>
                    </Router>
                    <DevTools />
                </div>
            </Provider>
        );


export default Root;