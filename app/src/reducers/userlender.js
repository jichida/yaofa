/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    set_lender_borrowlist_filler,
    queryintrestedorder_result,
    set_addloanid,
    set_loanlist,
    acceptorder_result
} from '../actions/index.js';

const initial = {
    userlender: {
        borrowlist : [],
        borrowlistfiller : {},
        addloanid : '',
        loanlist : []
    },
};

const userlender = createReducer({
    [queryintrestedorder_result]: (state, payload) => {
        return { ...state, borrowlist: payload.list };
    },
    [set_lender_borrowlist_filler]: (state, payload) => {
        return { ...state, borrowlistfiller: payload };
    },
    [set_addloanid]: (state, id) => {
        return { ...state, addloanid: id };
    },
    [set_loanlist]:(state, id) => {
        return { ...state, addloanid: id };
    },
    //放款回调
    [acceptorder_result]:(state, payload) => {
        console.log("acceptorder_result>>>:::"+JSON.stringify(payload));
        return { ...state };
    },
}, initial.userlender);

export default userlender;