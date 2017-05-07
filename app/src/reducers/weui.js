/**
 * Created by wangxiaoqing on 2017/3/25.
 */
/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    set_weui,
} from '../actions/index.js';

const initial = {
    weui: {
        toast: {
        	show : false,
        	text : "",
        	type : ""
        },
        alert : {
            show : false,
            title : "",
            text : "",
            buttonsClick : ()=>{}
        },
        confirm : {
            show : false,
            title : "",
            text : "",
            buttonsClose : ()=>{},
            buttonsClick : ()=>{}
        },
        loading : {
            show : false
        },
        action : {
            auto_show: true,
            ios_show: true,
            android_show: true,
            menus: [{
                label: '拍照',
                onClick: ()=> {}
            }, {
                label: '从手机相册选择',
                onClick: ()=> {}
            }],
            actions: [
                {
                    label: '取消',
                    onClick: ()=>{}
                }
            ]
        }
    },
};

const weui = createReducer({
    [set_weui]: (state, payload) => {
        return { ...state, ...payload };
    },
}, initial.weui);

export default weui;