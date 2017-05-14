/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
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
    //放款回调
    [acceptorder_result]:(state, payload) => {
        console.log("acceptorder_result>>>:::"+JSON.stringify(payload));
        return { ...state };
    },
    //获取我的放款订单列表
    [getmyorders_result]: (state, payload) => {
        console.log(payload);
        return { ...state, myorderlist: payload.list.docs };
    },
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
    
}, initial.userlender);

export default userlender;