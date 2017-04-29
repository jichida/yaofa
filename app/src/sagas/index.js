import { fork } from 'redux-saga/effects';
import {flowmain} from './flowmain';


export default function* rootSaga() {
  yield fork(flowmain);
}
