/**
 * Created by wangxiaoqing on 2017/3/25.
 */
/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    
} from '../actions/index.js';

const initial = {
    useragency: {
        borrowlist: [],
        orderlist:[],
    },
};

const useragency = createReducer({
    
}, initial.useragency);

export default useragency;