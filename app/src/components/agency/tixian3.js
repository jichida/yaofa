import React, { Component, PropTypes } from 'react';
import '../../../public/css/tixian.css';
import { connect } from 'react-redux';
import DocumentTitle from "react-document-title";
import {
    profit_set_profityanzhen,
    set_weui,
    sendauth_request,
    withdrawcashapplyauth_request,
} from '../../actions';

export class Page extends Component {

    constructor(props) {
        super(props);
        this.getYanZhenCodeInterval = null;
        this.state = {
            getYanZhenCodeText : "重新获取",
            getYanZhenCodeTime : 60,
        }
    }

    onClickReturn =()=>{
        this.props.history.goBack();
    }

    componentWillMount() {
        this.getYanZhenCode();
    }

    getYanZhenCode=()=>{
        this.props.dispatch(sendauth_request({phonenumber: this.props.username,reason:'withdraw'}));
    }

    //重新获取验证码
    getSendCode =()=>{
        this.props.dispatch(sendauth_request({phonenumber: this.props.username,reason:'withdraw'}));
    }

    submitProfitform =()=>{
        let form = this.props.profitform;
        let payload = {
            _id: this.props.profitid,
            username: this.props.username,
            authcode: this.props.profityanzhen
        };
        this.props.dispatch(withdrawcashapplyauth_request(payload));

    }

    setYanzhen =(e)=>{
        let val = e.target.value;
        this.props.dispatch(profit_set_profityanzhen(val));
    }

    render() {
        let showphonenumber = this.props.username.substr(0,3)+"****"+this.props.username.substr(7,4);
        return (
            <div className="messageCode AppPage">
                <DocumentTitle title="提现" />
                <div className="messageCodeContent">
                    <span className="tit">请输入<span className="phone">{showphonenumber}</span>收到的短信验证码</span>
                    <div className="messageCodeInput">
                        <span className="txt">验证码</span>
                        <input placeholder='请输入验证码' onChange={(e)=>{this.setYanzhen(e)}} />
                        <span
                            className="getcode"
                            onClick={()=>{this.getSendCode()}}>
                            {this.state.getYanZhenCodeText}
                        </span>
                    </div>

                </div>
                <div className="buttoncon">
                    <span
                        className="btn Primary" onClick={()=>{this.submitProfitform()}}
                        style={{width:"100%"}}
                    >
                        完成
                    </span>
                </div>
            </div>
        );
    }
}
const data =  ({userlogin,profit}) =>{ return {...userlogin, ...profit};};
export default connect(data)(Page);
