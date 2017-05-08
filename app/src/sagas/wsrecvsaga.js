import { put,takeEvery } from 'redux-saga/effects';
import {
  md_login_result,
  md_loginsendauth_result,
  showpopmessage,
  sendauth_result,
  login_result,
  common_err,
} from '../actions';
import { push,goBack,go  } from 'react-router-redux';//https://github.com/reactjs/react-router-redux

export function* wsrecvsagaflow() {
  yield takeEvery(`${md_login_result}`, function*(action) {
      let {payload:result} = action;
      yield put(login_result(result));
      yield put(push('/'));
  });

  yield takeEvery(`${md_loginsendauth_result}`, function*(action) {
      let {payload:result} = action;
      yield put(sendauth_result(result));
      yield put(showpopmessage({
        title:'成功',
        msg:result.popmessage,
        type:'success'
      }));
  });

  yield takeEvery(`${common_err}`, function*(action) {
      let {payload:result} = action;

        yield put(showpopmessage({
          title:result.title,
          msg:result.errmsg,
          type:'error'
        }));

  });

}
