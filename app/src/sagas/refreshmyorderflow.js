import {put,select,call,race,take,fork,takeEvery} from 'redux-saga/effects';
import config from '../env/config.js';
import {delay} from 'redux-saga';
import {
  getsystemconfig_request,
  getmyorders_request,
  queryuserstatus_request,
  queryuserstatus_result,
  login_result,
  getmyorders_result
} from '../actions';
//import moment from "moment";
var myorders_time  = null;

 function* refreshsystemconfig(){
  while (true) {
      yield put(getsystemconfig_request({}));
      yield call(delay, config.refreshsysconfiginterval);
  }
}
 function* refreshmyorderflow(){
  while (true) {
        yield call(delay, config.refreshmyorderinterval);
        const loginsuccess = yield select((state) => state.userlogin.loginsuccess);

        if(loginsuccess){

          let usertype = localStorage.getItem('usertype');

          let payload = {
              query:{},
              options:{
                  sort: { updated_at: -1 }
              }
          };
          if(!!myorders_time && myorders_time!==""){
              payload.query = {updated_at:{'$gt': new Date(myorders_time)}}
          }

          yield put(getmyorders_request(payload));

          const { res, timeout } = yield race({
             res: take(`${getmyorders_result}`),
             timeout: call(delay, 10000)
          });

          yield put(queryuserstatus_request({}));
          const { res2, timeout2 } = yield race({
             res2: take(`${queryuserstatus_result}`),
             timeout2: call(delay, 10000)
          });
          
        }//loginsuccess
    }//while
  }

export function* createflow(){

  yield fork(refreshmyorderflow);
  yield fork(refreshsystemconfig);
  yield takeEvery(`${getmyorders_result}`, function*(action) {
      let {payload} = action;
      let newmyorderlist = {};
      let firstorder = {};
      if(payload.list.docs.length>0){
        firstorder = payload.list.docs[0];
        myorders_time = firstorder.updated_at;
      }

  });
  yield takeEvery(`${login_result}`, function*(action) {
      myorders_time = null
  });

}