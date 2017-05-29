import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-weui/lib/react-weui.min.css';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
const {
    Msg, Footer, FooterLinks, FooterLink, FooterText, Page:PageUI
    } = WeUI;

let Page =(props)=>{

    // let okclick = ()=>{
    //     window.parent.props.history.push("http://www.baidu.com");
    // }

    return (
        <div className="msg_success" style={{width:"100%"}}>
            <Msg
                type="success"
                title="认证成功"
            />
        </div>
    )    
}


Page = connect()(Page);
export default Page;