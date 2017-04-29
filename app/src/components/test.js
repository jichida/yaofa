/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-weui/lib/react-weui.min.css';


import
{
  test_getabouthtml_request,
  test_register,
  test_sendauth,
  test_findpwd,
  test_userloginborrow,
  test_insertorder,
  test_userloginlender,
  test_acceptorder,
  test_confirmorder,
  test_getmyorders,
  test_userloginagency
} from '../test';

// let curcharact = {
//     'userborrow':借款人,
//     'userlender':放款人,
//     'useragency':中介
// };

let Page =(props)=>{
    let onClickPage=(name)=>{
        props.history.push(name);
    };
    return (<div>
        <p style={{textAlign: 'center'}}>
          <botton className="btn Primary" onClick={()=>{test_userloginborrow(props.dispatch)}}>借款人微信登录</botton>
          <botton className="btn Primary" onClick={()=>{test_insertorder(props.dispatch)}}>借款请求</botton>
          <botton className="btn Primary" onClick={()=>{test_getmyorders(props.dispatch)}}>我的借款</botton>
          <botton className="btn Primary" onClick={()=>{test_confirmorder(props.dispatch)}}>确认放款</botton>
          <br />
          <botton className="btn Primary" onClick={()=>{test_userloginlender(props.dispatch)}}>放款人微信登录</botton>
          <botton className="btn Primary" onClick={()=>{test_acceptorder(props.dispatch)}}>接受借款请求</botton>
          <botton className="btn Primary" onClick={()=>{test_getmyorders(props.dispatch)}}>我的放款</botton>
          <botton className="btn Primary" onClick={()=>{test_confirmorder(props.dispatch)}}>放款成功</botton>
          <br />
          <botton className="btn Primary" onClick={()=>{test_userloginagency(props.dispatch)}}>中介微信登录</botton>
          <botton className="btn Primary" onClick={()=>{test_getmyorders(props.dispatch)}}>我的放款人订单</botton>
          <br />
         <botton className="btn Primary" onClick={()=>{test_register(props.dispatch,'userborrow')}}>借款人注册</botton>
          <botton className="btn Primary" onClick={()=>{test_register(props.dispatch,'userlender')}}>放款人注册</botton>
          <botton className="btn Primary" onClick={()=>{test_register(props.dispatch,'useragency')}}>中介注册</botton>
          <br />
          <botton className="btn Primary" onClick={()=>{test_sendauth(props.dispatch)}}>发送验证码</botton>
          <botton className="btn Primary" onClick={()=>{test_findpwd(props.dispatch,'userborrow')}}>找回密码</botton>
  
          <botton className="btn Primary" onClick={()=>{test_getabouthtml_request(props.dispatch)}}>测试关于信息</botton>
          <br />
        </p>
    </div>);
}


Page = connect()(Page);
export default Page;