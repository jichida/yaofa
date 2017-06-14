/**
 * 跳转首页
 * 借款 userborrower 中介 useragency 放款 userlender
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from '../env/config.js';

import {
    fillprofile_request,
    getweixinpic_request
    }  from "../actions";

export class Page extends Component {

    componentWillMount() {

        let openid = localStorage.getItem("openid");
        let access_token = localStorage.getItem("access_token");
        //console.log(openid);

        //fillprofile_request
        if(openid&&openid!==''){
            //更新用户头像和昵称数据
            this.props.dispatch(getweixinpic_request({openid: openid, access_token: access_token}));

        }else{
            console.log(config.redirect_uri_renzheng);
            window.location.href= config.redirect_uri_renzheng;
            //console.log("index getopenid");
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
            window.setTimeout(()=>{
                //console.log("set profile");
                //console.log(!!localStorage.getItem("nickname"));
                //console.log(localStorage.getItem("nickname"));
                //console.log(localStorage.getItem("headimgurl"));
                if(!!localStorage.getItem("nickname")){
                    this.props.dispatch(fillprofile_request({
                            nickname: localStorage.getItem("nickname"),
                            avatar: localStorage.getItem("headimgurl"),
                    }))
                }
            },1000)
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
const data = ({userlogin:{usertype,loginsuccess}}) => {
    return {usertype,loginsuccess};
};
Page = connect(data)(Page);
Page = withRouter(Page);
export default Page;
//"img/myprofile/1.png"
//
//fillprofile

//getweixinpic
