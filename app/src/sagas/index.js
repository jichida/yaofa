import { fork } from 'redux-saga/effects';
import {flowmain} from './flowmain';
import {wsrecvsagaflow} from './wsrecvsaga';
import {payflow} from './payflow';

export default function* rootSaga() {
  yield fork(wsrecvsagaflow);
  yield fork(flowmain);
  yield fork(payflow);
}
