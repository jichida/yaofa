/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import _ from 'lodash';
import {
    set_lender_borrowlist_filler,
    queryintrestedorder_result,
    set_addloanid,
    acceptorder_result,
    logout_result,
    getmyorders_result,
    lender_set_endorder_moneyreal,
    lender_set_ui_endorder,
    lender_set_endorder_status,
    gettodaycancelorderrecord_result
} from '../actions/index.js';

const initial = {
    userlender: {
        borrowlist : [],
        borrowlistfiller : {},
        addloanid : '',
        myorderlist: {},
        ui_endorder : false,
        endorder_moneyreal: 0,
        endorder_status : true,
        bosscancelorder : []
    },
};

const userlender = createReducer({
    [queryintrestedorder_result]: (state, payload) => {
        return { ...state, borrowlist: payload.list };
    },
    [set_lender_borrowlist_filler]: (state, payload) => {
        return { ...state, borrowlistfiller: payload };
    },
    [set_addloanid]: (state, id) => {
        return { ...state, addloanid: id };
    },
    //获取我的放款订单列表
    // [getmyorders_result]: (state, payload) => {
    //     let newmyorderlist = {};
    //     _.map(payload.list.docs, (order,index)=>{
    //         newmyorderlist[order._id]=order;
    //     })
    //     return { ...state, myorderlist:newmyorderlist };
    // },
    //退出登录
    [logout_result]:(state, result) => {
        return { ...state,...initial.userlender}
    },
    //
    [lender_set_ui_endorder]:(state, ui_endorder) => {
        return { ...state, ui_endorder}
    },
    //
    [lender_set_endorder_status]:(state, endorder_status) => {
        return { ...state, endorder_status}
    },
    //获取商家取消订单的次数 result
    [gettodaycancelorderrecord_result]: (state, payload) => {
        let bosscancelorder = payload.result;
        return { ...state, bosscancelorder };
    },
    
}, initial.userlender);

export default userlender;