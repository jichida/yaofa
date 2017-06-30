import { put,takeEvery,select } from 'redux-saga/effects';
import {
    md_login_result,
    md_loginsendauth_result,
    md_insertorder_result,
    md_withdrawcashapplyaddone_result,
    md_withdrawcashapplyauth_result,
    withdrawcashapplyaddone_result,
    confirmorder_result,
    insertorder_result,
    sendauth_result,
    login_result,
    common_err,
    set_weui,
    findpwd_result,
    acceptorder_result,
    fillrealnameprofile_result,
    fillrealnameprofile_request,
    profit_set_profitid,
    userauthentication_result,
    userauthenticationhtml_result,
    register_result,
    getzhimascore_result,
    md_queryuserstatus_result,
    queryuserstatus_result,
    
} from '../actions';

// let weixininfo = this.props.weixin.info;
// this.props.dispatch(fillprofile_request({
//     profile: {
//         nickname: weixininfo.nickname,
//         avatar: weixininfo.headimgurl,
//         sex: weixininfo.sex==1?"男":"女"
//     }
// }));

import { replace,goBack } from 'react-router-redux';//https://github.com/reactjs/react-router-redux

const getuserinfo = (state) => {
    let info = state.userlogin;
    return {info};
};

export function* wsrecvsagaflow() {

    //获取认证地址回调
    yield takeEvery(`${userauthenticationhtml_result}`, function*(action) {
        //console.log(action);
        // let loading = {
        //     show : false,
        // }
        // yield put(set_weui({ loading }));
        window.location.href = action.payload.html.url;

    });

    //获取芝麻信息回调 getzhimascore_request
    yield takeEvery(`${getzhimascore_result}`, function*(action) {
        let toast = {
            show : true,
            text : "芝麻认证成功",
            type : "success"
        }
        yield put(set_weui({ toast }));
        yield put(replace("/validation"));
    });

    //登录
    yield takeEvery(`${md_login_result}`, function*(action) {

        console.log("is md_login_result");

        let {payload:result} = action;
        let loading = {
            show : false,
        }
        yield put(set_weui({ loading }));

        const userlogin = yield select(getuserinfo);
        const local_openid = localStorage.getItem("openid");
        const local_accesstoken = localStorage.getItem("access_token");
        

        // console.log("get userlogin >>>>>>>");
        // console.log(userlogin);
        // console.log(local_openid);
        // console.log(local_accesstoken);

        if(userlogin.info.weixinopenid!==local_openid || userlogin.info.weixinaccesstoken!==local_accesstoken){
            let payloads = {
                data:{
                    'weixinopenid':local_openid,
                    'weixinaccesstoken':local_accesstoken,
                }
            };
            console.log("fillrealnameprofile_request::::::::>>>");
            console.log(payloads);
            
            yield put(fillrealnameprofile_request(payloads));
        }
        
        yield put(login_result(result));
        //yield put(replace('/'));
    });
    //重置密码
    yield takeEvery(`${findpwd_result}`, function*(action) {
        let toast = {
            show : true,
            text : "重置密码成功",
            type : "success"
        }
        yield put(set_weui({ toast }));
        yield put(replace('/login'));
    });
    //生车提现订单
    yield takeEvery(`${md_withdrawcashapplyaddone_result}`, function*(action) {
        yield put(withdrawcashapplyaddone_result(action));
        yield put(profit_set_profitid(action.payload.newitem._id));
        yield put(replace('/tixian3'));
    });
    //提现申请成功提交 withdrawcashapplyauth_request
    yield takeEvery(`${md_withdrawcashapplyauth_result}`, function*(action) {
        let toast = {
            show : true,
            text : "提现申请成功",
            type : "success"
        }
        yield put(set_weui({ toast }));
        yield put(goBack());
    });
    //修改用户借款资料 fillrealnameprofile_result
    yield takeEvery(`${fillrealnameprofile_result}`, function*(action) {
        let loading = {
            show : false,
        }
        yield put(set_weui({ loading }));
        //yield put(goBack());
    });
    //放款抢单 acceptorder_result
    yield takeEvery(`${acceptorder_result}`, function*(action) {
        let toast = {
            show : true,
            text : "抢单成功",
            type : "success"
        }
        yield put(set_weui({ toast }));
        yield put(replace(`/orderdetail/${action.payload.updateditem._id}`));
    });
    //发送验证码
    yield takeEvery(`${md_loginsendauth_result}`, function*(action) {
        let {payload:result} = action;
        let toast = {
            show : true,
            text : '发送验证码成功',
            type : "success"
        }
        yield put(set_weui({ toast }));
        yield put(sendauth_result(result));
    });

    //更新订单状态 confirmorder_request
    yield takeEvery(`${confirmorder_result}`, function*(action) {
        console.log("confirmorder_result:::"+JSON.stringify(action));
        let {payload:result} = action;
        let toast = {
            show : true,
            text : "提交成功",
            type : "success"
        }
        yield put(set_weui({ toast }));
    });

    //注册回调
    yield takeEvery(`${register_result}`, function*(action) {
        console.log("register_result:::"+JSON.stringify(action));
        let {payload:result} = action;
        let toast = {
            show : true,
            text : "注册成功",
            type : "success"
        }
        yield put(set_weui({ toast }));
        yield put(replace('/'));
    });

    //错误反馈
    yield takeEvery(`${common_err}`, function*(action) {
        let {payload:result} = action;

        let loading = {
            show : false,
        }
        yield put(set_weui({ loading }));
        console.log(result.type);
        if(!!result.errmsg){
            let toast = {
                show : true,
                text : result.errmsg,
                type : "warning"
            }
            yield put(set_weui({ toast }));
        }
        // if(result.type === 'login'){
        //     yield put(replace('/register'));
        // }
    });
    //发布借款信息
    yield takeEvery(`${md_insertorder_result}`, function*(action) {
        let {payload:result} = action;
        //console.log("insertorder_request:::>"+JSON.stringify(result));
        let toast = {
            show : true,
            text : "发布成功",
            type : "success"
        }
        yield put(set_weui({ toast }));
        yield put(insertorder_result(result));
        yield put(goBack());
    });

    //身份证照片审核回调
    yield takeEvery(`${userauthentication_result}`, function*(action) {
        //const {payload:result} = action;
        //console.log(action);
        //yield put(goBack());
    });

    //身份证照片审核回调
    yield takeEvery(`${md_queryuserstatus_result}`, function*(action) {
        //const {payload:result} = action;
        //console.log(action);
        //yield put(goBack());
        // console.log("is m_queryuserstatus_result");

        // let {payload:result} = action;
        // let loading = {
        //     show : false,
        // }
        // yield put(set_weui({ loading }));
        // const local_openid = localStorage.getItem("openid");
        // const local_accesstoken = localStorage.getItem("access_token");

        // console.log("fillrealnameprofile_request::::::::>>>");
        // console.log(result);

        // if(userlogin.info.weixinopenid!==local_openid || userlogin.info.weixinaccesstoken!==local_accesstoken){
        //     let payloads = {
        //         data:{
        //             'weixinopenid':local_openid,
        //             'weixinaccesstoken':local_accesstoken,
        //         }
        //     };
        //     console.log("fillrealnameprofile_request::::::::>>>");
        //     console.log(payloads);
            
        //     yield put(fillrealnameprofile_request(payloads));
        // }
        console.log("md_queryuserstatus_result");
        yield put(queryuserstatus_result(action));
    });

    //
}
