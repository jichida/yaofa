import { createReducer } from 'redux-act';
import {

} from '../actions/index.js';


const initial = {
    app: {
        curtabindex: 0,
        type: 'error',
        title: '',
        msg: '',
        ispop: false,
        newmsgnumber:0
    },

};

const app = createReducer({
   
}, initial.app);

export default app;