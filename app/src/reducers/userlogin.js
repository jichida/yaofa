/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    login_result,
    register_result,
    user_type,
    sendauth_result,
    logout_result,
    confirmorder_result,
    fillrealnameprofile_result
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
        weixinopenid: '',
        weixinaccesstoken: '',
        usertype: '',//用户类型 借款 userborrow 中介 useragency 放款 userlender

        //register
        canaccept : true,

        urlphoneid1:'',//身份证照片正面
        urlphoneid2:'',//身份证照片反面
        urlphoneid3:'',//身份证照片手持
        
    },
};

const userlogin = createReducer({

    //登录回调
    [login_result]: (state, payload) => {
        let usertype = localStorage.getItem("usertype");
        if(!!usertype){
            if(!!payload.token){
                localStorage.setItem(`${usertype}_user_token`, payload.token);
            }
            return { ...state, ...payload};
        }else{
            return { ...state }
        }
        
    },
    [logout_result]:(state, result) => {
        
        return { ...state,...initial.userlogin}
    },
    //设置用户类型
    [user_type]:(state, type) => {
        localStorage.setItem('usertype', type);
        return { ...state, usertype: type }
    },
    //发送验证码回调
    [sendauth_result]:(state, result) => {
        //console.log(result);
        return { ...state }
    },
    //注册回调
    [register_result]:(state, result)=>{
        //console.log(result);
        return { ...state }
    },
    //修改用户资料回调
    [fillrealnameprofile_result]:(state, result) => {
        console.log("userlogin fillrealnameprofile_result");
        console.log(result);
        return { ...state, ...result };
    },
    //借款人确认商家回调
    [confirmorder_result]:(state, payload) => {
        let canaccept = false;
        return { ...state,  canaccept};
    },
}, initial.userlogin);

export default userlogin;