import { fork } from 'redux-saga/effects';
import {flowmain} from './flowmain';
import {wsrecvsagaflow} from './wsrecvsaga';
import {payflow} from './payflow';
import {createflow} from './refreshmyorderflow';
import {createloadingflow} from './loading';

export default function* rootSaga() {
  yield fork(createloadingflow);
  yield fork(wsrecvsagaflow);
  yield fork(flowmain);
  yield fork(payflow);
  yield fork(createflow);
}
