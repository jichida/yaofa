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
    showpopmessage,
    sendauth_result,
    login_result,
    common_err,
    set_weui,
    findpwd_result,
    acceptorder_result,
    fillrealnameprofile_result,
    profit_set_profitid,

    
    fillprofile_request

} from '../actions';


// let weixininfo = this.props.weixin.info;
// this.props.dispatch(fillprofile_request({
//     profile: {
//         nickname: weixininfo.nickname,
//         avatar: weixininfo.headimgurl,
//         sex: weixininfo.sex==1?"男":"女"
//     }
// }));

import { push,replace,goBack,go  } from 'react-router-redux';//https://github.com/reactjs/react-router-redux

// const getweixininfo = (state) => {
//     let weixininfo = state.weixin.info;
//     let userinfo = state.userlogin.profile;
//     console.log("saga::::" + weixininfo);
//     return {weixininfo,userinfo};
// };

export function* wsrecvsagaflow() {

    //获取用户微信数据
    // yield takeEvery(`${md_getweixinpic_result}`, function*(action) {
    //     yield put(fillprofile_request(
    //         {
    //             profile: {
    //                 nickname: action.nickname,
    //                 avatar: action.headimgurl,
    //                 sex: action.sex==1?"男":"女"
    //             }
    //         }
    //     ));
    //     //yield put(replace('/'));
    // }); 

    //登录
    yield takeEvery(`${md_login_result}`, function*(action) {
        let {payload:result} = action;
        //登录成功跟新用户头像和名称数据
        // const redux_userinfo = yield select(getweixininfo);
        // console.log("redux_userinfo ::: ");
        // console.log(redux_userinfo);
        
        // if(redux_userinfo.weixininfo.hasOwnProperty("nickname")){
        //     if(
        //         redux_userinfo.weixininfo.nickname != redux_userinfo.userinfo.nickname || 
        //         redux_userinfo.weixininfo.headimgurl != redux_userinfo.userinfo.avatar
        //         ){
        //         yield put(fillprofile_request({
        //             profile: {
        //                 nickname: redux_userinfo.weixininfo.nickname,
        //                 avatar: redux_userinfo.weixininfo.headimgurl,
        //                 sex: redux_userinfo.weixininfo.sex==1?"男":"女"
        //             }
        //         }))
        //     }
        // }

        yield put(login_result(result));
        yield put(replace('/'));
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
        let toast = {
            show : true,
            text : "提交成功",
            type : "success"
        }
        yield put(set_weui({ toast }));
        yield put(goBack());
    });
    //放款抢单 acceptorder_result
    yield takeEvery(`${acceptorder_result}`, function*(action) {
        let toast = {
            show : true,
            text : "抢单成功",
            type : "success"
        }
        yield put(set_weui({ toast }));
        yield put(push("/borrowinfo"));
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
        let {payload:result} = action;
        let toast = {
            show : true,
            text : "提交成功",
            type : "success"
        }
        yield put(set_weui({ toast }));
    });

    //错误反馈
    yield takeEvery(`${common_err}`, function*(action) {
        let {payload:result} = action;

        let loading = {
            show : false,
        }
        yield put(set_weui({ loading }));
        
        let toast = {
            show : true,
            text : result.errmsg +"::"+ result.type,
            type : "warning"
        }
        yield put(set_weui({ toast }));
        // if(result.type === 'login'){
        //     yield put(replace('/register'));
        // }
    });
    //发布借款信息
    yield takeEvery(`${md_insertorder_result}`, function*(action) {
        let {payload:result} = action;
        console.log("insertorder_request:::>"+JSON.stringify(result));
        let toast = {
            show : true,
            text : "发布成功",
            type : "success"
        }
        yield put(set_weui({ toast }));
        yield put(insertorder_result(result));
        yield put(goBack());
    });


}
