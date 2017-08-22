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
    fillrealnameprofile_result,
    queryuserstatus_result
} from '../actions/index.js';
import _ from 'lodash';
const initial = {
    userlogin: {
        editusername: '',//用户昵称
        loginsuccess: false,
        username: '',//账号
        userid: '',
        token: '',
        profile: {},
        contact1:{
          name:'',
          phonenumber:''
        },
        contact2:{
          name:'',
          phonenumber:''
        },
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




    [queryuserstatus_result]:(state, payload) => {
        const {
            approvalrejectseason,
            approvalstatus,
            contact1:payloadcontact1,
            contact2:payloadcontact2,
            hasdanwei,
            hasgongjijin,
            hasgudingzichan,
            hasjinrihuankuan,
            hassanhaotongyi,
            hasshebao,
            hasshenfenzhengyuanjian,
            hasyuqijilu,
            hukou,
            jiedaibaofuzai,
            jiedaobaoyihuan,
            limithuabei,
            limitjiebei,
            realtimeforphoneyear,
            resultid,
            resultid_obj,
            resultphone,
            resultphone_detail,
            resultphone_detail_excel,
            resultphone_obj,
            resultphoto,
            resultphoto1_obj,
            resultphoto2_obj,
            resultrealname,
            resulttaobao,
            resultzhima,
            truename,
            urlphoneid1,
            urlphoneid2,
            urlphoneid3,
            useragencyfrom,
            userid,
            username,
            weixinaccesstoken,
            weixinopenid,
            ...rest
        } = payload;

        let contact1 = state.contact1;
        contact1.name = _.get(payloadcontact1,'name','');
        contact1.phonenumber = _.get(payloadcontact1,'phonenumber','');
        let contact2 = state.contact2;
        contact2.name = _.get(payloadcontact2,'name','');
        contact2.phonenumber = _.get(payloadcontact2,'phonenumber','');

        return {
            ...state,
            approvalrejectseason,
            approvalstatus,
            contact1,
            contact2,
            hasdanwei,
            hasgongjijin,
            hasgudingzichan,
            hasjinrihuankuan,
            hassanhaotongyi,
            hasshebao,
            hasshenfenzhengyuanjian,
            hasyuqijilu,
            hukou,
            jiedaibaofuzai,
            jiedaobaoyihuan,
            limithuabei,
            limitjiebei,
            realtimeforphoneyear,
            resultid,
            resultid_obj,
            resultphone,
            resultphone_detail,
            resultphone_detail_excel,
            resultphone_obj,
            resultphoto,
            resultphoto1_obj,
            resultphoto2_obj,
            resultrealname,
            resulttaobao,
            resultzhima,
            truename,
            urlphoneid1,
            urlphoneid2,
            urlphoneid3,
            useragencyfrom,
            userid,
            username,
            weixinaccesstoken,
            weixinopenid,
            ...rest
        }
    },

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
        //alert("logout_result");
        //useragency_user_token
        //userborrow_user_token
        //userlender_user_token
        localStorage.setItem("usertype", "");
        localStorage.setItem("useragency_user_token", "");
        localStorage.setItem("userborrow_user_token", "");
        localStorage.setItem("userlender_user_token", "");
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
        //console.log("userlogin fillrealnameprofile_result");
        //console.log(result);
        //console.log("fillrealnameprofile_result:::");
        //console.log(result);
        return { ...state, ...result };
    },
    //借款人确认商家回调
    // [confirmorder_result]:(state, payload) => {
    //     let canaccept = false;
    //     return { ...state,  canaccept};
    // },
}, initial.userlogin);

export default userlogin;
