import {put,select,call} from 'redux-saga/effects';
import config from '../env/config.js';
import {delay} from 'redux-saga';
import {getmyorders_request} from '../actions';

export function* refreshmyorderflow(){
  while (true) {
        yield call(delay, config.refreshmyorderinterval);
        const loginsuccess = yield select((state) => state.userlogin.loginsuccess);
        if(loginsuccess){
          yield put(getmyorders_request({query:{}}));
        }
    }
  }
