import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-weui/lib/react-weui.min.css';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import {
    settypeuserauthentication_request,
} from '../../actions';
const {
    Msg, Footer, FooterLinks, FooterLink, FooterText, Page:PageUI
    } = WeUI;

class Page extends Component {

    
    componentWillMount() {
        let tp = this.props.type;
        let id = this.props.userid;
        let value = {};
        if(tp === 'phone'){
            value.resultphone= 1;
        }
        if(tp === 'taobao'){
            value.resulttaobao= 1;
        }
        console.log(JSON.stringify(this.props));
        console.log(tp);
        console.log(id);
        console.log(settypeuserauthentication_request);
        console.log(this.props.dispatch);
        this.props.dispatch(settypeuserauthentication_request({
            data: value,
            query: {_id:id}
        }))
    };

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

const data = ({},props) => {
    let type = props.match.params.type;
    let userid = props.match.params.userid;
    return {type, userid};
};
Page = connect(data)(Page);
export default Page;