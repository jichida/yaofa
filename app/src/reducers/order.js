import { createReducer } from 'redux-act';
import {
    set_orderinfo,
    confirmorder_result
} from '../actions/index.js';

const initial = {
    order: {
        orderInfo : {},
    },
};

const order = createReducer({
	
    //借款详情界面
    [set_orderinfo]: (state, payload) => {
        return { ...state, orderInfo: payload };
    },
    //借款人确认商家回调
    [confirmorder_result]:(state, payload) => {
    	let orderInfo = { ...state.orderInfo, ...payload.updateditem }
        return { ...state,  orderInfo};
    },

}, initial.order);

export default order;