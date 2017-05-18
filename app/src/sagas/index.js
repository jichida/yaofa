import { fork } from 'redux-saga/effects';
import {flowmain} from './flowmain';
import {wsrecvsagaflow} from './wsrecvsaga';
import {payflow} from './payflow';
import {refreshmyorderflow,refreshsystemconfig} from './refreshmyorderflow';

export default function* rootSaga() {
  yield fork(wsrecvsagaflow);
  yield fork(flowmain);
  yield fork(payflow);
  yield fork(refreshmyorderflow);
  yield fork(refreshsystemconfig);
}
