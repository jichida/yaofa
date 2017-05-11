import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-weui/lib/react-weui.min.css';

let Page =(props)=>{
    let onClickReturn = ()=> {
        props.history.goBack();
    };

     return (
        <div 
            style={{
                flexGrow:"1",
                overflow:"scroll"
            }}
            >
            <b>回调成功啦</b>
            <p style={{textAlign: 'center'}}>
                <botton className="btn Primary" onClick={onClickReturn}>返回</botton>
             </p>
        </div>);
}


Page = connect()(Page);
export default Page;