/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    login_result,
    register_result,
    user_type
} from '../actions/index.js';

const initial = {
    userlogin: {
        editusername: '',//用户昵称
        loginsuccess: false,
        username: '',//账号
        userid: '',
        token: '',
        profile: {},
        invitecode: '',
        balance: 0,
        openid: '',
        usertype: '',//用户类型 userborrower useragency userlender
    },
};

const userlogin = createReducer({

    //注册用户
    [register_result]: (state, result) => {
        console.log("userlogin::::>"+JSON.stringify(result));
        return state;
    },
    //设置用户类型
    [user_type]:(state, type) => {
        return { ...state, usertype: type }
    }
    //

}, initial.userlogin);

export default userlogin;