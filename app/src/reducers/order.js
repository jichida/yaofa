import { createReducer } from 'redux-act';
import {
    set_orderinfo,
    confirmorder_result,
    acceptorder_result,
    set_myorderlistStatus
} from '../actions/index.js';

const initial = {
    order: {
        orderInfo : {},
        myorderlistStatus : "借款中",
    },
};

const order = createReducer({
	
    //借款详情界面
    [set_orderinfo]: (state, payload) => {
        return { ...state, orderInfo: payload };
    },
    //抢单回调
    [acceptorder_result]:(state, payload) => {
        return { ...state, orderInfo: payload.updateditem };
    },
    //借款人确认商家回调
    [confirmorder_result]:(state, payload) => {
    	let orderInfo = { ...state.orderInfo, ...payload.updateditem }
        return { ...state,  orderInfo};
    },
    //设置借款列表状态
    [set_myorderlistStatus]: (state, payload) => {
        return { ...state, myorderlistStatus: payload };
    },

}, initial.order);

export default order;