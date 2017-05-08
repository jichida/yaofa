/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    login_result,
    register_result,
    user_type,
    sendauth_result
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
        usertype: '',//用户类型 借款userborrow 中介useragency 放款userlender

        //register
        
    },
};

const userlogin = createReducer({

    //登录回调
    [login_result]: (state, userinfo) => {
        return { ...state, ...userinfo};
    },
    //设置用户类型
    [user_type]:(state, type) => {
        localStorage.setItem('usertype', type);
        return { ...state, usertype: type }
    },
    //发送验证码回调
    [sendauth_result]:(state, result) => {
        console.log(result);
        return { ...state }
    },
    //注册回调
    [register_result]:(state, result)=>{
        console.log(result);
        return { ...state }
    }

}, initial.userlogin);

export default userlogin;