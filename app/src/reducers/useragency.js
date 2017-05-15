/**
 * Created by wangxiaoqing on 2017/3/25.
 */
/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import _ from 'lodash';
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
    //获取我的放款订单列表
    // [getmyorders_result]: (state, payload) => {
    //     let newmyorderlist = {};
    //     _.map(payload.list.docs, (order,index)=>{
    //         newmyorderlist[order._id]=order;
    //     })
    //     return { ...state, myorderlist:newmyorderlist };
    // },
    //
    [logout_result]:(state, result) => {
        return { ...state,...initial.useragency}
    },
}, initial.useragency);

export default useragency;