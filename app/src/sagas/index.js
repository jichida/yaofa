import { fork } from 'redux-saga/effects';
import {flowmain} from './flowmain';
import {wsrecvsagaflow} from './wsrecvsaga';
import {payflow} from './payflow';
import {refreshmyorderflow} from './refreshmyorderflow';

export default function* rootSaga() {
  yield fork(wsrecvsagaflow);
  yield fork(flowmain);
  yield fork(payflow);
  yield fork(refreshmyorderflow);
}
