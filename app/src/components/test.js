/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import
{
  test_getabouthtml_request,
} from '../test/testabout';
import 'react-weui/lib/react-weui.min.css';

let Page =(props)=>{
    let onClickPage=(name)=>{
        props.history.push(name);
    };
    return (<div>
        <p style={{textAlign: 'center'}}>
            <botton className="btn Primary" onClick={()=>{test_getabouthtml_request(props.dispatch)}}>测试关于信息</botton><br />
             <br />
        </p>
    </div>);
}


Page = connect()(Page);
export default Page;