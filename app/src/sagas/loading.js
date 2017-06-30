import { select,put,takeEvery,race,take,call,takeLatest} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
    set_weui,
    login_result,
    getabouthtml_request,
    getmyorders_request,
    getmyborrowusers_request,
    getrechargerecords_request,
    sendauth_request,
    queryintrestedorder_request,
    fillprofile_request,
    gettodaycancelorderrecord_request,
} from '../actions';
import { push } from 'react-router-redux';
import _ from 'lodash';

const getloginstate = (state) => {
  const {loginsuccess} = state.userlogin;
  return {
    loginsuccess
  };
}

export function* createloadingflow(){
  let action_request = (action)=>{
    let actiontype = action.type;
    return _.endsWith(actiontype,'_request');
  }

  yield takeEvery(action_request, function*(actionreq) {
    let actionstringsz = _.split(actionreq.type,/[ _]/);
    let actionstring = actionstringsz[actionstringsz.length - 2];//肯定大于1，因为已经判断有_了
    if(actionstring === 'loginwithtoken' || actionstring==='loginwithauth'){
      actionstring = 'login';
    }

    if(actionstring !== 'login' && actionstring !== 'logout'){
      let action_result = (action)=>{
        let actiontype = action.type;
        let isresult = _.endsWith(actiontype,`${actionstring}_result`);
        if(isresult){
          return true;
        }
        return false;
      }

      let action_commonerr = (action)=>{
        let actiontype = action.type;
        let iscommon_err = _.endsWith(actiontype,'common_err');
        if(iscommon_err){
          const {payload} = action;
          if(!!payload){
            return payload.type === actionstring;
          }
        }
        return false;
      }

      const { result,err, timeout } = yield race({
          result: take(action_result),
          err: take(action_commonerr),
          timeout: call(delay, 800)
      });

      if(!!timeout){
        //超过800毫秒才弹 getmyorders queryuserstatus
        if(actionstring!=="getmyorders" && actionstring!=="queryuserstatus" ){
          yield put(set_weui({
              loading : {
                  show : true
              },
          }));
        }

        const { result,err, timeout } = yield race({
            result: take(action_result),
            err: take(action_commonerr),
            timeout: call(delay, 2000)
        });

        if(!!timeout){
          console.log(`这是什么请求，要等那么多时间===>${actionstring}`);
        }

        yield put(set_weui({
            loading : {
                show : false
            },
        }));
      }
    }
    else{
      console.log(`这个请求就不要loading了===>${actionstring}`);
    }

  });

  //===========************===========
  yield takeLatest(
    [
      `${getmyborrowusers_request}`,
      `${getabouthtml_request}`,
      `${getmyorders_request}`,
      `${getrechargerecords_request}`,
      `${sendauth_request}`,
      `${queryintrestedorder_request}`,
      `${fillprofile_request}`,
      `${gettodaycancelorderrecord_request}`
    ]
    , function*(action) {
      //目的地地址选中后
      const {loginsuccess} = yield select(getloginstate);
      if(!loginsuccess){
        yield take(`${login_result}`);
        yield put(action);
        console.log(`等待登录后才发送：${JSON.stringify(action.type)}`);
      }
    });
}
