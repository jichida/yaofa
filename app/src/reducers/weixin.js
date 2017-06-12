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
        //console.log("getweixinpic_result"+JSON.stringify(payload));
        //let info = payload.hasOwnProperty("errcode")?{}:payload;
        if(!payload.hasOwnProperty("errcode")){
        	localStorage.setItem("nickname", payload.nickname);
        	localStorage.setItem("headimgurl", payload.headimgurl);
        }
        // {"openid":"o3sS7wQlOQ63upppLGEm1jBcunvM",
        // "nickname":"klk","sex":1,
        // "language":"zh_CN","city":"常州",
        // "headimgurl":"http://wx.qlogo.cn/mmopen/WPI4WwsdYzTxarHuxVLgVwFncXKe4CH86B2MzFOEhyX1SQhauztMB0wIb9ChxiabfSET5LibLP7k6agia2VpnlIq60yKUVOlctc/0","privilege":[]}
        return { ...state };
    },
}, initial.weixin);

export default weixin;