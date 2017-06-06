import { createAction } from 'redux-act';

export const insertorder_request = createAction('insertorder_request');
export const insertorder_result = createAction('insertorder_result');

export const getmyorders_request = createAction('getmyorders_request');
export const getmyorders_result = createAction('getmyorders_result');

export const queryintrestedorder_request = createAction('queryintrestedorder_request');
export const queryintrestedorder_result = createAction('queryintrestedorder_result');

export const acceptorder_request = createAction('acceptorder_request');
export const acceptorder_result = createAction('acceptorder_result');

export const confirmorder_request = createAction('confirmorder_request');
export const confirmorder_result = createAction('confirmorder_result');

export const payorder_request =  createAction('payorder_request');
export const payorder_result = createAction('payorder_result');
export const getpaysign_request  =  createAction('getpaysign_request');
export const getpaysign_result = createAction('getpaysign_result');

export const set_myorderlistStatus = createAction('set_myorderlistStatus');
export const set_orderinfo = createAction('set_orderinfo');
export const set_tousucontent = createAction('set_tousucontent');



export const insertcancelorderrecord_request = createAction('insertcancelorderrecord_request');
export const insertcancelorderrecord_result = createAction('insertcancelorderrecord_result');

export const gettodaycancelorderrecord_request = createAction('gettodaycancelorderrecord_request');
export const gettodaycancelorderrecord_result = createAction('gettodaycancelorderrecord_result');


//set_tousucontent
// insertcancelorderrecord_request
// insertcancelorderrecord_result
// gettodaycancelorderrecord_result
// gettodaycancelorderrecord_request