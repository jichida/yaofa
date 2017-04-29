import { UPDATE } from 'admin-on-rest';

export const REVIEW_APPROVE = 'REVIEW_APPROVE2';
export const REVIEW_APPROVE_LOADING = 'REVIEW_APPROVE_LOADING2';
export const REVIEW_APPROVE_FAILURE = 'REVIEW_APPROVE_FAILURE2';
export const REVIEW_APPROVE_SUCCESS = 'REVIEW_APPROVE_SUCCESS2';

export const reviewApprove = (id, data, basePath) => ({
    type: REVIEW_APPROVE,
    payload: { id, data: { ...data, isapprovaled:true}, basePath },
    meta: { resource: 'useragency', fetch: UPDATE, cancelPrevious: false },
});

export const REVIEW_REJECT = 'REVIEW_REJECT2';
export const REVIEW_REJECT_LOADING = 'REVIEW_REJECT_LOADING2';
export const REVIEW_REJECT_FAILURE = 'REVIEW_REJECT_FAILURE2';
export const REVIEW_REJECT_SUCCESS = 'REVIEW_REJECT_SUCCESS2';

export const reviewReject = (id, data, basePath) => ({
    type: REVIEW_REJECT,
    payload: { id, data: { ...data, isapprovaled:false}, basePath },
    meta: { resource: 'useragency', fetch: UPDATE, cancelPrevious: false },
});
