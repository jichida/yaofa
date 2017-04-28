import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import app from './app';
import about from './about';
export default combineReducers(
  { 
    app,
    about,
    form: formReducer
  }
);