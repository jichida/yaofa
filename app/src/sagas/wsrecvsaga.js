import { put,takeEvery } from 'redux-saga/effects';
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
    profit_set_profitid
} from '../actions';
import { push,replace,goBack,go  } from 'react-router-redux';//https://github.com/reactjs/react-router-redux

export function* wsrecvsagaflow() {
    //登录
    yield takeEvery(`${md_login_result}`, function*(action) {
        let {payload:result} = action;
        yield put(login_result(result));
        yield put(push('/'));
    });
    //重置密码
    yield takeEvery(`${findpwd_result}`, function*(action) {
        let toast = {
            show : true,
            text : "重置密码成功",
            type : "success"
        }
        yield put(set_weui({ toast }));
        yield put(push('/login'));
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
            text : result.popmessage,
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
        let toast = {
            show : true,
            text : result.errmsg,
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
