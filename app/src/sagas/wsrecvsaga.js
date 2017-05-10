import { put,takeEvery } from 'redux-saga/effects';
import {
  md_login_result,
  md_loginsendauth_result,
  md_insertorder_result,
  insertorder_result,
  showpopmessage,
  sendauth_result,
  login_result,
  common_err,
  set_weui
} from '../actions';
import { push,replace,goBack,go  } from 'react-router-redux';//https://github.com/reactjs/react-router-redux

export function* wsrecvsagaflow() {
    //登录
    yield takeEvery(`${md_login_result}`, function*(action) {
        let {payload:result} = action;
        yield put(login_result(result));
        yield put(push('/'));
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
    //错误反馈
    yield takeEvery(`${common_err}`, function*(action) {
        let {payload:result} = action;
        let toast = {
            show : true,
            text : result.errmsg,
            type : "warning"
        }
        yield put(set_weui({ toast }));
        if(result.type === 'login'){
            yield put(replace('/register'));
        }
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
