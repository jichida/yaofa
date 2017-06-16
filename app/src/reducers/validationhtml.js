/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createReducer } from 'redux-act';
import {
    userauthenticationhtml_result,
} from '../actions/index.js';

const initial = {
    validationhtml: {
        html:{
        	code:-1,
            errorCode:"-1"
        }
    },
};

const validationhtml = createReducer({
    // [userauthenticationhtml_result]:(state, payload) =>{
    //     console.log(payload);
    // 	// const {html} = payload;
    // 	// return { ...state,html}
    // },
}, initial.validationhtml);

export default validationhtml;
