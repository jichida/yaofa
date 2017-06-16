import {put,select,call,race,take} from 'redux-saga/effects';
import config from '../env/config.js';
import {delay} from 'redux-saga';
import {
  getsystemconfig_request,
  getmyorders_request,
  queryuserstatus_request,
  queryuserstatus_result,
  login_result
} from '../actions';

export function* refreshsystemconfig(){
  while (true) {
      yield put(getsystemconfig_request({}));
      yield call(delay, config.refreshsysconfiginterval);
  }
}
export function* refreshmyorderflow(){
  while (true) {
        yield call(delay, config.refreshmyorderinterval);
        const loginsuccess = yield select((state) => state.userlogin.loginsuccess);
        if(loginsuccess){
          yield put(getmyorders_request({
            query:{
              //orderstatus:{$nin:[-1,4]}
            },
            options:{
              sort: { created_at: -1 },
              page: 1,
              limit: 100,
            }
          }));
          let usertype = localStorage.getItem('usertype');
          //if(usertype === 'userborrow'){
            yield put(queryuserstatus_request({}));

            const { response, timeout } = yield race({
               response: take(`${queryuserstatus_result}`),
               timeout: call(delay, config.refreshmyorderinterval)
            });
            if(timeout){
              console.log(`请求超时`)
            }
            else{
              let {payload:result} = response;
              yield put(login_result(result));
            }
          ////usertype
        }//loginsuccess
    }//while
  }
