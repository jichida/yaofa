/*
    个人中心
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/usercenter.css';
import Footer from './footer';
import { connect } from 'react-redux';
import { 
    set_borrowinfo
    }  from "../../actions";
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

    gotoUserBorrowInfo=(info)=>{
        this.props.dispatch(set_borrowinfo(info));
        this.pushUrl("/borrowuserinfo");
    }

	render() {
        const { title,profile,userlogin } = this.props;
        return (
    		<div className="usercenterPage AppPage">
    			<DocumentTitle title={title} />
                <div className="headcontent">
                    <img src="img/27.png" />
                    <div className="userinfo">
                        <img src={profile.avatar} />
                        <span>{profile.nickname}</span>
                    </div>
                </div>
                <div className="list">
                    <Cells>
                        <Cell 
                            access
                            onClick={()=>{this.pushUrl("/validation")}}
                            >
                            <CellHeader>
                                <img src="img/33.png" alt="" />
                            </CellHeader>
                            <CellBody>
                                认证中心
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                        <Cell 
                            access
                            onClick={()=>{this.gotoUserBorrowInfo(userlogin)}}
                            >
                            <CellHeader>
                                <img src="img/34.png" alt="" />
                            </CellHeader>
                            <CellBody>
                                借款资料
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                        <Cell
                            access
                            onClick={()=>{this.pushUrl("/borrowlist")}}
                            >
                            <CellHeader>
                                <img src="img/35.png" alt="" />
                            </CellHeader>
                            <CellBody>
                                我的借款
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                        <Cell
                            access
                            onClick={()=>{this.pushUrl("/uservalidationinfo")}}
                            >
                            <CellHeader>
                                <img src="img/35.png" alt="" />
                            </CellHeader>
                            <CellBody>
                                认证信息
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                    </Cells>
                    <Cells>
                        <Cell
                            access
                            onClick={()=>{this.pushUrl("/settings")}}
                            >
                            <CellHeader>
                                <img src="img/10.png" alt="" />
                            </CellHeader>
                            <CellBody>
                                设置
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                    </Cells>
                </div>
                <Footer action={2}/>
            </div>
    	)
    }
}

const data = ({userlogin}) => {
    let title = "个人中心";
    let usertype = localStorage.getItem('usertype');
    if(usertype=="userborrow"){ title = "借款人中心"; }
    if(usertype=="useragency"){ title = "中介中心"; }
    if(usertype=="userlender"){ title = "放宽人中心"; }
    let profile = userlogin.profile;
    return {userlogin,title,profile};
};
Page = connect(data)(Page);
export default Page;

