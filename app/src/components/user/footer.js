import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import { withRouter } from 'react-router-dom';
const {
    Tab,
    TabBarItem,
    Article,
    } = WeUI;

class Page extends Component {

    clickItem =(name)=>{
        this.props.history.replace(name);
    }

	render() {

        let iconlist = {
            0 : ["img/1.png", "img/2.png"],
            1 : ["img/3.png", "img/4.png"],
        };

        let icon1 = iconlist[0][0];
        let icon2 = iconlist[1][0];

        //首页
        if(this.props.action==0){
            icon1 = iconlist[0][0];
            icon2 = iconlist[1][0];
        }
        //借款列表
        if(this.props.action==1){
            icon1 = iconlist[0][1];
            icon2 = iconlist[1][0];
        }
        //个人中心
        if(this.props.action==2){
            icon2 = iconlist[0][1];
            icon1 = iconlist[1][0];
        }

        return (
            <div
                className="footer userfooter"
                >
                <div
                    onClick={()=>{this.clickItem("/agencyindex")}}
                    className="item"
                    >
                    <img src={icon1} />
                    <span>借款纪录</span>
                </div>
                <div
                    onClick={()=>{this.clickItem("/addborrow")}}
                    className="item"
                    >
                    <span className="addBorrowBtn"><span></span></span>
                    <span>我要借款</span>
                </div>
                <div
                    onClick={()=>{this.clickItem("/agencyusercenter")}}
                    className="item"
                    >
                    <img src={icon2} />
                    <span>我的</span>
                </div>
            </div>
    	)
    }
}

export default withRouter(Page);