import { UPDATE } from 'admin-on-rest';

export const REVIEW_APPROVE = 'REVIEW_APPROVE3';
export const REVIEW_APPROVE_LOADING = 'REVIEW_APPROVE_LOADING3';
export const REVIEW_APPROVE_FAILURE = 'REVIEW_APPROVE_FAILURE3';
export const REVIEW_APPROVE_SUCCESS = 'REVIEW_APPROVE_SUCCESS3';

export const reviewApprove = (id, data, basePath) => ({
    type: REVIEW_APPROVE,
    payload: { id, data: { ...data, approvalstatus:'已审核'}, basePath },
    meta: { resource: 'useragency', fetch: UPDATE, cancelPrevious: false },
});

export const REVIEW_REJECT = 'REVIEW_REJECT3';
export const REVIEW_REJECT_LOADING = 'REVIEW_REJECT_LOADING3';
export const REVIEW_REJECT_FAILURE = 'REVIEW_REJECT_FAILURE3';
export const REVIEW_REJECT_SUCCESS = 'REVIEW_REJECT_SUCCESS3';

export const reviewReject = (id, data, basePath) => ({
    type: REVIEW_REJECT,
    payload: { id, data: { ...data, approvalstatus:'已拒绝'}, basePath },
    meta: { resource: 'useragency', fetch: UPDATE, cancelPrevious: false },
});

export const REVIEW_APPROVESTART = 'REVIEW_APPROVESTART3';
export const REVIEW_APPROVESTART_LOADING = 'REVIEW_APPROVESTART_LOADING3';
export const REVIEW_APPROVESTART_FAILURE = 'REVIEW_APPROVESTART_FAILURE3';
export const REVIEW_APPROVESTART_SUCCESS = 'REVIEW_APPROVESTART_SUCCESS3';

export const reviewApproveStart = (id, data, basePath) => ({
    type: REVIEW_APPROVESTART,
    payload: { id, data: { ...data, approvalstatus:'审核中'}, basePath },
    meta: { resource: 'useragency', fetch: UPDATE, cancelPrevious: false },
});



export const reviewApprove = (id, data, basePath) => ({
    type: REVIEW_APPROVE,
    payload: { id, data: { ...data, isapprovaled:true}, basePath },
    meta: { resource: 'useragency', fetch: UPDATE, cancelPrevious: false },
});

