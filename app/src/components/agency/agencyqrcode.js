/*
    个人中心
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/agencyqrcode.css';
import { connect } from 'react-redux';
//import connect from 'react-redux/lib/connect';
import QRCode from "qrcode.react";
import config from '../../env/config.js';

const {
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter
    } = WeUI;

class Page extends Component {

    pushUrl = (name)=>{
        this.props.history.push(name);
    }
    //invitecode
	render() {
    const {invitecode} = this.props;
        return (
    		<div className="agencyqrcodePage AppPage">
    			<DocumentTitle title="我的邀请码" />

                <div className="list">
                    <span className="code">{invitecode}</span>
                    <QRCode
                        value={`${config.serverurl}/app/#/registerborrow/${invitecode}`}
                        size={200}
                        />
                    <div className="desc">
                        扫描二维码,邀请好友加入
                    </div>
                </div>
            </div>
    	)

    }
}

const mapStateToProps =  ({userlogin:{invitecode}}) =>{
    return {invitecode};
};
export default connect(
    mapStateToProps
)(Page);
