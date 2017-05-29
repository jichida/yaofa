import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-weui/lib/react-weui.min.css';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import {
    fillrealnameprofile_request,
} from '../../actions';
const {
    Msg, Footer, FooterLinks, FooterLink, FooterText, Page:PageUI
    } = WeUI;

class Page extends Component {

    render(){
        return (
            <div className="msg_success" style={{width:"100%"}}>
                <Msg
                    type="warning"
                    title="数据提交失败"
                    description="请联系客服帮您解决问题"
                />
            </div>
        )
    }
}

Page = connect()(Page);
export default Page;