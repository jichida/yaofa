/*
    设置
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import { connect } from 'react-redux';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../public/css/settings.css';
const { 
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellHeader
    } = WeUI;
import {
    logout_request
    } from '../actions';

class Page extends Component {

    onClickLogout = ()=>{
        let usertype = '';
        //localStorage.setItem(`${usertype}_user_token`, userinfo.token);
        this.props.dispatch(logout_request({}));
        //this.props.history.goBack();
    };

    pagePush=(name)=>{
        this.props.history.push(name);
    }

	render() {
        const { usertype } = this.props;
        return (
    		<div className="settingsPage AppPage">
    			<DocumentTitle title="放款详情" />
                <Cells>
                    {!!usertype?(
                        <div>
                            {usertype=="userlender"?(
                                <Cell
                                    onClick={()=>{this.pagePush("/abouthtml/feeminu")}}
                                    access>
                                    <CellHeader>
                                        <img src="img/19.png" alt="" style={{display: `block`, width: `30px`, marginRight: `5px`}}/>
                                    </CellHeader>
                                    <CellBody>
                                        收费规则
                                    </CellBody>
                                    <CellFooter />
                                </Cell>
                            ):""}
                            {usertype=="useragency"?(
                                <Cell 
                                    onClick={()=>{this.pagePush("/abouthtml/feepuls")}}
                                    access>
                                    <CellHeader>
                                        <img src="img/19.png" alt="" style={{display: `block`, width: `30px`, marginRight: `5px`}}/>
                                    </CellHeader>
                                    <CellBody>
                                        收益规则
                                    </CellBody>
                                    <CellFooter />
                                </Cell>
                            ):""}
                        </div>
                    ):""}

                    <Cell 
                        onClick={()=>{this.pagePush("/abouthtml/aboutus")}}
                        access>
                        <CellHeader>
                            <img src="img/19.png" alt="" style={{display: `block`, width: `30px`, marginRight: `5px`}}/>
                        </CellHeader>
                        <CellBody>
                            关于我们
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell 
                        onClick={()=>{this.pagePush("/abouthtml/servicerule")}}
                        access>
                        <CellHeader>
                            <img src="img/19.png" alt="" style={{display: `block`, width: `30px`, marginRight: `5px`}}/>
                        </CellHeader>
                        <CellBody>
                            服务协议
                        </CellBody>
                        <CellFooter />
                    </Cell>
                    <Cell 
                        onClick={()=>{this.pagePush("/abouthtml/helpcenter")}}
                        access>
                        <CellHeader>
                            <img src="img/19.png" alt="" style={{display: `block`, width: `30px`, marginRight: `5px`}}/>
                        </CellHeader>
                        <CellBody>
                            帮助中心
                        </CellBody>
                        <CellFooter />
                    </Cell>
                </Cells>

                <div className="submitBtn">
                    <button 
                        onClick = {()=>{this.onClickLogout()}}
                        className="btn Primary">
                        <span>退出登录</span>
                    </button>
                </div>
    		</div>
    	)
    }
}
const data =  ({userlogin}) =>{
    let usertype = localStorage.getItem("usertype");
    return {...userlogin, usertype};
};
export default connect(data)(Page);