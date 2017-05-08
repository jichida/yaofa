import { fork } from 'redux-saga/effects';
import {flowmain} from './flowmain';
import {wsrecvsagaflow} from './wsrecvsaga';

export default function* rootSaga() {
  yield fork(wsrecvsagaflow);
  yield fork(flowmain);
}
