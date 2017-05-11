import { createReducer } from 'redux-act';
import {
    set_orderinfo,
} from '../actions/index.js';

const initial = {
    order: {
        
        orderInfo : {},

    },
};

const order = createReducer({
	
    //借款详情界面
    [set_orderinfo]: (state, payload) => {
        return { ...state, orderInfo: payload };
    },
    
}, initial.order);

export default order;