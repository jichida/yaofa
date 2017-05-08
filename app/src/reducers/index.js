import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import app from './app';
import about from './about';
import userlogin from './userlogin';
import weui from './weui';
export default combineReducers(
  { 
    app,
    about,
    userlogin,
    weui,
    form: formReducer
  }
);