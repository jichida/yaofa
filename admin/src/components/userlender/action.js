import { UPDATE } from 'admin-on-rest';

export const REVIEW_APPROVE = 'REVIEW_APPROVE1';
export const REVIEW_APPROVE_LOADING = 'REVIEW_APPROVE_LOADING1';
export const REVIEW_APPROVE_FAILURE = 'REVIEW_APPROVE_FAILURE1';
export const REVIEW_APPROVE_SUCCESS = 'REVIEW_APPROVE_SUCCESS1';

export const reviewApprove = (id, data, basePath) => ({
    type: REVIEW_APPROVE,
    payload: { id, data: { ...data, isapprovaled:true}, basePath },
    meta: { resource: 'userlender', fetch: UPDATE, cancelPrevious: false },
});

export const REVIEW_REJECT = 'REVIEW_REJECT1';
export const REVIEW_REJECT_LOADING = 'REVIEW_REJECT_LOADING1';
export const REVIEW_REJECT_FAILURE = 'REVIEW_REJECT_FAILURE1';
export const REVIEW_REJECT_SUCCESS = 'REVIEW_REJECT_SUCCESS1';

export const reviewReject = (id, data, basePath) => ({
    type: REVIEW_REJECT,
    payload: { id, data: { ...data, isapprovaled:false}, basePath },
    meta: { resource: 'userlender', fetch: UPDATE, cancelPrevious: false },
});
