/**
 * 提现功能
 */
import { createReducer } from 'redux-act';
import _ from 'lodash';
import {
    profit_set_listtype,
    profit_set_tixianform,
    profit_set_profitid,
    profit_set_profityanzhen,
    logout_result,
    getrechargerecords_result
} from '../actions/index.js';

const initial = {
    profit: {
        //设置提现首页菜单列表
        set_listtype : 0,

        //获取收益列表
        profitlist : [],

        //设置提现表单
        profitform:{
            truename:'',//真实姓名
            bankaccount:'',//银行账号
            bankname:'',//银行名称
            cashmoney: 0,//提现金额
        },
        //申请提现记录id
        profitid : '',
        //申请提现输入验证码
        profityanzhen : ''

    },
};

const profit = createReducer({
    [logout_result]:(state, payload)=>{
        return { ...initial.profit};
    },
    //申请提现输入验证码
    [profit_set_profityanzhen]:(state,payload)=>{
        return {...state, profityanzhen:payload}
    },
    //设置申请提现id
    [profit_set_profitid]:(state,payload)=>{
        return {...state, profitid:payload }
    },
    //设置提现表单
    [profit_set_tixianform]:(state, payload)=>{
        let profitform = {...state.profitform, ...payload}
        return {...state, profitform}
    },


    //设置提现首页菜单列表
    [profit_set_listtype]:(state, payload)=>{
        return {...state, set_listtype: payload}
    },
    //获取收益列表
    [getrechargerecords_result]:(state, payload)=>{
        let profitlist = payload.result.docs
        return {...state, profitlist}
    },

}, initial.profit);

export default profit;