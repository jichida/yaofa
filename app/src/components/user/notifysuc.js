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

    componentWillMount(){
        let tp = this.props.type;
        let value = {};
        if(tp === 'phone'){
            value.resultphone= 1;
        }
        if(tp === 'taobao'){
            value.resulttaobao= 1;
        }
        this.props.dispatch(fillrealnameprofile_request({data:value}));
    }
    render(){
        return (
            <div className="msg_success" style={{width:"100%"}}>
                <Msg
                    type="success"
                    title="资料递交成功"
                    description="系统正在审核中..."
                />
            </div>
        ) 
    }
}

const data = ({userlogin:{resulttaobao,resultid,resultphone,resultzhima,resultrealname}},props) => {
    let type = props.match.params.type;
    return {resulttaobao,resultid,resultphone,resultzhima,resultrealname, type};
};
Page = connect(data)(Page);
export default Page;