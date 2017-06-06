/**
 * 跳转首页
 * 借款 userborrower 中介 useragency 放款 userlender
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    fillprofile_request,
    }  from "../actions";

export class Page extends Component {

    componentWillMount() {

        let openid = localStorage.getItem("openid");
        //console.log(openid);

        //fillprofile_request
        if(openid&&openid!=''){
            //更新用户头像和昵称数据
            let weixininfo = this.props.weixin.info;
            this.props.dispatch(fillprofile_request({
                profile: {
                    nickname: weixininfo.nickname,
                    avatar: weixininfo.headimgurl,
                    sex: weixininfo.sex==1?"男":"女"
                }
            }));
        }else{
            window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8ec8ba53700c0c89&redirect_uri=http%3A%2F%2Fwx.mrtejia.cn%2fapp%2fgetopenid&response_type=code&scope=snsapi_base&state=123#wechat_redirect"; 
            console.log("index getopenid");
        }

        let usertype = localStorage.getItem('usertype');
        let loginsuccess = this.props.loginsuccess;
        if(loginsuccess){
            if(usertype==="userborrow"){
                this.props.history.replace("/userindex");
            }
            else if(usertype==="useragency"){
                this.props.history.replace("/agencyindex");
            }
            else if(usertype==="userlender"){
                this.props.history.replace("/bossindex");
            }
        }
        else{
            this.props.history.replace("/login");
        }
    };
    render(){
        return (
            <div></div>
        )
    }
}
const data = ({userlogin:{usertype,loginsuccess},weixin}) => {
    return {usertype,loginsuccess,weixin};
};
Page = connect(data)(Page);
Page = withRouter(Page);
export default Page;
//"img/myprofile/1.png"
//
//fillprofile

//getweixinpic
