import { createAction } from 'redux-act';

export const insertorder_request = createAction('insertorder_request');
export const insertorder_result = createAction('insertorder_result');

export const getmyorders_request = createAction('getmyorders_request');
export const getmyorders_result = createAction('getmyorders_result');

export const acceptorder_request = createAction('acceptorder_request');
export const acceptorder_result = createAction('acceptorder_result');

export const confirmorder_request = createAction('confirmorder_request');
export const confirmorder_result = createAction('confirmorder_result');