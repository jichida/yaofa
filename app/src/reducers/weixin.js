/**
 * Created by wangxiaoqing on 2017/3/25.
 */
/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    getweixinpic_result,
} from '../actions/index.js';

const initial = {
    weixin: {
        info : {}
    },
};

const weixin = createReducer({
    [getweixinpic_result]: (state, payload) => {
        console.log("getweixinpic_result"+JSON.stringify(payload));
        let info = payload;
        return { ...state, info };
    },
}, initial.weixin);

export default weixin;