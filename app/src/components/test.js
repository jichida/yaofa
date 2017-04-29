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
  test_findpwd
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
          <botton className="btn Primary" onClick={()=>{test_register(props.dispatch,'userborrow')}}>借款人注册</botton><br />
          <botton className="btn Primary" onClick={()=>{test_register(props.dispatch,'userlender')}}>放款人注册</botton><br />
          <botton className="btn Primary" onClick={()=>{test_register(props.dispatch,'useragency')}}>中介注册</botton><br />
          <br />
          <botton className="btn Primary" onClick={()=>{test_sendauth(props.dispatch)}}>发送验证码</botton><br />
          <botton className="btn Primary" onClick={()=>{test_findpwd(props.dispatch)}}>找回密码</botton><br />
  
          <botton className="btn Primary" onClick={()=>{test_getabouthtml_request(props.dispatch)}}>测试关于信息</botton><br />
          <br />
        </p>
    </div>);
}


Page = connect()(Page);
export default Page;