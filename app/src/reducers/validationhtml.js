/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createReducer } from 'redux-act';
import {
    userauthenticationhtml_result
} from '../actions/index.js';

const initial = {
    validationhtml: {
        html:''
    },
};

const validationhtml = createReducer({
    [userauthenticationhtml_result]:(state, payload) =>{
    	const {html} = payload;
    	return { ...state,html}
    },
}, initial.validationhtml);

export default validationhtml;
