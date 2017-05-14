/**
 * Created by wangxiaoqing on 2017/3/25.
 */
/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    getmyborrowusers_result,
    logout_result,
    getmyorders_result
} from '../actions/index.js';

const initial = {
    useragency: {
        borrowlist: [],
        orderlist:[],
        myorderlist: {},

    },
};

const useragency = createReducer({
    [getmyborrowusers_result]:(state, result) =>{
    	console.log(result);
    	return { ...state, borrowlist:result.list}
    },
    //获取我的发展会员生成的订单列表
    [getmyorders_result]: (state, payload) => {
        console.log(payload);
        return { ...state, myorderlist: payload.list.docs };
    },
    [logout_result]:(state, result) => {
        return { ...state,...initial.useragency}
    },
}, initial.useragency);

export default useragency;