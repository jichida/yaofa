import 'babel-polyfill';
import React, { Component } from 'react';
import { Admin, Resource ,Delete} from 'admin-on-rest';
import themeReducer from './themeReducer';
import authClient from './authClient';

import logo from './logo.svg';
import './App.css';
import sagas from './sagas';
import Login from './Login';
import Layout from './Layout';
import Menu from './Menu';
//import { Dashboard } from './dashboard';
import CustomRoutes from './routes';
import translations from './i18n';

import {AboutlistList,AboutlistEdit,AboutlistCreate} from './components/abouts/index.js';
import {UserAgencylistList,UserAgencylistEdit} from './components/useragency/index.js';
import {UserBorrowlistList,UserBorrowlistEdit} from './components/userborrow/index.js';
import {UserLenderlistList,UserLenderlistEdit} from './components/userlender/index.js';
import {SystemconfigList,SystemconfigShow,SystemconfigCreate,SystemconfigEdit} from './components/systemconfig/index.js';
import {OrderlistList,OrderlistEdit} from './components/orders/index.js';

import restClient from './restClient';
class App extends Component {
     render() {
        return (
            <Admin
                title="要发平台管理后台"
                restClient={restClient}
                customReducers={{ theme: themeReducer }}
                customSagas={sagas}
                customRoutes={CustomRoutes}
                authClient={authClient}
                loginPage={Login}
                appLayout={Layout}
                menu={Menu}
                locale="cn"
                messages={translations}
            >
                <Resource name="about" list={AboutlistList} edit={AboutlistEdit} create={AboutlistCreate}  />
                <Resource name="systemconfig" list={SystemconfigList} show={SystemconfigShow} edit={SystemconfigEdit}  create={SystemconfigCreate} />
                <Resource name="order" list={OrderlistList} edit={OrderlistEdit}/>
                <Resource name="useragency" list={UserAgencylistList} edit={UserAgencylistEdit}/>
                <Resource name="userborrower" list={UserBorrowlistList} edit={UserBorrowlistEdit}/>
                <Resource name="userlender" list={UserLenderlistList} edit={UserLenderlistEdit}/>
           </Admin>
        );
    }
}

export default App;
