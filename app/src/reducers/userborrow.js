/**
 * Created by wangxiaoqing on 2017/3/25.
 */
/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import _ from 'lodash';
import {
    set_borrowinfo,
    confirmorder_result,
    logout_result,
    borrow_ui_sureorder,
    fillrealnameprofile_result
} from '../actions/index.js';

const initial = {
    userborrow: {
        borrowinfo: {},
        //我的借款列表
        myorderlist: {},


    },
};

const userborrow = createReducer({
    [set_borrowinfo]:(state, userinfo) =>{
    	return { ...state, borrowinfo: userinfo}
    },
    //获取我的放款订单列表
    // [getmyorders_result]: (state, payload) => {
    //     let newmyorderlist = {};
    //     _.map(payload.list.docs, (order,index)=>{
    //         newmyorderlist[order._id]=order;
    //     })
    //     return { ...state, myorderlist:newmyorderlist };
    // },
    //确认放款回调
    // [confirmorder_result]:(state, result) => {
    //     console.log(result);
    //     return { ...state};
    // },
    //控制弹框是否显示
    [borrow_ui_sureorder]:(state, sureorder) => {
        return { ...state, sureorder };
    },
    //修改用户资料回调
    [fillrealnameprofile_result]:(state, result) => {
        //console.log("userborrow fillrealnameprofile_result");
        //console.log(result);
        let borrowinfo = { ...state.borrowinfo, ...result};
        return { ...state, borrowinfo };
    },
    //退出登录
    [logout_result]:(state, result) => {
        return { ...state,...initial.userborrow}
    },
}, initial.userborrow);

export default userborrow;