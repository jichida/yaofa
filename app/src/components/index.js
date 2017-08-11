/**
 * 跳转首页
 * 借款 userborrower 中介 useragency 放款 userlender
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { withRouter } from 'react-router-dom';
//import withRouter from 'react-router-dom/withRouter';
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

        //alert(openid);

        //fillprofile_request
        if(openid&&openid!==''){

            //更新用户头像和昵称数据
            this.props.dispatch(getweixinpic_request({openid: openid, access_token: access_token}));

        }else{
            //console.log(config.redirect_uri_renzheng);
            //window.location.href= config.redirect_uri_renzheng;
            //console.log("index getopenid");
        }

        let usertype = localStorage.getItem('usertype');
        let loginsuccess = this.props.loginsuccess;
        let profile = this.props.profile;
        let local_nickname = localStorage.getItem("nickname");
        let local_headimgurl = localStorage.getItem("headimgurl");
        if(loginsuccess){

            if(profile.nickname!==local_nickname || profile.avatar!==local_headimgurl){
                window.setTimeout(()=>{
                    if(!!localStorage.getItem("nickname")){
                        this.props.dispatch(fillprofile_request({
                                nickname: local_nickname,
                                avatar: local_headimgurl,
                        }))
                    }
                },10)
            }

            if(usertype==="userborrow"){
                this.props.history.replace("/userindex");
            }
            else if(usertype==="useragency"){
                this.props.history.replace("/agencyindex");
            }
            else if(usertype==="userlender"){
                this.props.history.replace("/bossindex");
            }
            
        }else{
            if(!!usertype && (usertype==='userborrow'||usertype==='useragency'||usertype==='userlender')){
                this.props.history.replace("/login");
            }else{
                this.props.history.replace("/usertype");
            }
        }

    };


    render(){
        return (
            <div></div>
        )
    }
}
const data = ({userlogin:{usertype,loginsuccess,profile}}) => {
    return {usertype,loginsuccess,profile};
};
Page = connect(data)(Page);
export default Page;
//"img/myprofile/1.png"
//
//fillprofile

//getweixinpic
