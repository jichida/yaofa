import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { showNotification } from 'admin-on-rest';
import {
    REVIEW_APPROVE_SUCCESS,
    REVIEW_APPROVE_FAILURE,
    REVIEW_REJECT_SUCCESS,
    REVIEW_REJECT_FAILURE,
    REVIEW_APPROVESTART_SUCCESS,
    REVIEW_APPROVESTART_FAILURE,
} from './action';

export default function* reviewSaga() {
    yield [
        takeEvery(REVIEW_APPROVE_SUCCESS, function* (action) {
            yield put(showNotification('resources.userborrower.notification.approved_success'));
            yield put(push('/userborrower'));
        }),
        takeEvery(REVIEW_APPROVE_FAILURE, function* (action) {
            const {error} = action;
            yield put(showNotification('resources.userborrower.notification.approved_error', 'warning'));
            console.error(error);
        }),
        takeEvery(REVIEW_REJECT_SUCCESS, function* (action) {
            yield put(showNotification('resources.userborrower.notification.rejected_success'));
            yield put(push('/userborrower'));
        }),
        takeEvery(REVIEW_REJECT_FAILURE, function* (action) {
            const {error} = action;
            yield put(showNotification('resources.userborrower.notification.rejected_error', 'warning'));
            console.error(error);
        }),
        takeEvery(REVIEW_APPROVESTART_SUCCESS, function* (action) {
            yield put(showNotification('resources.userborrower.notification.approvedstart_success'));
            yield put(push('/userborrower'));
        }),
        takeEvery(REVIEW_APPROVESTART_FAILURE, function* (action) {
            const {error} = action;
            yield put(showNotification('resources.userborrower.notification.approvedstart_error', 'warning'));
            console.error(error);
        }),
    ];
}



