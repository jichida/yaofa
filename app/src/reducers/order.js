import { createReducer } from 'redux-act';
import _ from 'lodash';
import {
    set_orderinfo,
    confirmorder_result,
    acceptorder_result,
    set_myorderlistStatus,
    getmyorders_result,
    set_tousucontent,
} from '../actions/index.js';

const initial = {
    order: {
        orderInfo : {},
        myorderlistStatus : "借款中",
        tousucontent : "",
        myorderlist: {}
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
    //设置投诉内容
    [set_tousucontent]:(state, payload) => {
        return { ...state, tousucontent: payload };
    },
    //获取我的放款订单列表
    [getmyorders_result]: (state, payload) => {
        let newmyorderlist = {};
        _.map(payload.list.docs, (order,index)=>{
            newmyorderlist[order._id]=order;
        })
        return { ...state, myorderlist:newmyorderlist };
    },

}, initial.order);

export default order;