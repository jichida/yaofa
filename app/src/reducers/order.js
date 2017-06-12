import { createReducer } from 'redux-act';
import _ from 'lodash';
import {
    set_orderinfo,
    confirmorder_result,
    acceptorder_result,
    set_myorderlistStatus,
    getmyorders_result,
    set_tousucontent,
    gettodaycancelorderrecord_result
} from '../actions/index.js';

const initial = {
    order: {
        orderInfo : {},
        myorderlistStatus : "借款中",
        tousucontent : "",
        myorderlist: {},
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
        console.log(payload);
    	let orderInfo = { ...state.orderInfo, ...payload.updateditem };

        if(!!orderInfo._id){
            let neworderinfo = {};
            let myorderlist = {}
            neworderinfo[orderInfo._id] = orderInfo;
            myorderlist = { ...state.myorderlist, neworderinfo };
            return { ...state, orderInfo, myorderlist};
        }else{
            return { ...state, orderInfo};
        }
        
        
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
        let myorderlist = { ...state.myorderlist, ...newmyorderlist }
        return { ...state, myorderlist };
    },
    //获取商家取消订单的次数 result
    [gettodaycancelorderrecord_result]: (state, payload) => {
        let bosscancelorder = payload.result;
        return { ...state, bosscancelorder };
    },


}, initial.order);

export default order;