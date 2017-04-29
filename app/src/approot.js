/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import Test from './components/test.js';

import {requireAuthentication} from './components/requireauthentication';

import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

const CoApp = (props) => {
    let CustomRoute = Route;
    return (
        <Switch>
            <CustomRoute exact path="/" component={Test}/>
        </Switch>
    );
}


//app
class AppRoot extends React.Component {
    render() {        
        return (
            <div><CoApp /></div>
        );
    }
}

export default AppRoot;