/**
 * Created by wangxiaoqing on 2017/3/25.
 */
/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    getmyborrowusers_result
} from '../actions/index.js';

const initial = {
    useragency: {
        borrowlist: [],
        orderlist:[],
    },
};

const useragency = createReducer({
    [getmyborrowusers_result]:(state, result) =>{
    	console.log(result);
    	return { ...state, borrowlist:result.list}
    },
}, initial.useragency);

export default useragency;