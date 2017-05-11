/**
 * Created by wangxiaoqing on 2017/3/25.
 */
/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
	getmyorders_result,
    set_myorderlistStatus,
    set_borrowinfo,
    confirmorder_result,
} from '../actions/index.js';

const initial = {
    userborrow: {
        borrowinfo: {},
        //我的借款列表
        myorderlist: {},
        myorderlistStatus : "借款中",

    },
};

const userborrow = createReducer({
    [set_borrowinfo]:(state, userinfo) =>{
    	return { ...state, borrowinfo: userinfo}
    },
    //获取我的借款订单列表
    [getmyorders_result]: (state, payload) => {
        
        return { ...state, myorderlist: payload.list };
    },
    //设置借款列表状态
    [set_myorderlistStatus]: (state, payload) => {
        return { ...state, myorderlistStatus: payload };
    },
    //确认放款回调
    [confirmorder_result]:(state, result) => {
        console.log(result);
        return { ...state};
    },
}, initial.userborrow);

export default userborrow;