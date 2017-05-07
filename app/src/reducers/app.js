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
        newmsgnumber:0,
        islogin : false,//判断是否登录
    },

};

const app = createReducer({
   
}, initial.app);

export default app;