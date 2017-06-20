import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import withRouter from 'react-router-dom/withRouter';
const {
    Tab,
    TabBarItem,
    Article,
    } = WeUI;

class Page extends Component {

    clickItem =(name)=>{
        this.props.history.push(name);
    }

	render() {

        let iconlist = {
            0 : ["img/1.png", "img/2.png"],
            1 : ["img/3.png", "img/4.png"],
        };

        let icon1 = iconlist[0][0];
        let icon2 = iconlist[1][0];

        //个人首页
        if(this.props.action==1){
            icon1 = iconlist[0][1];
            icon2 = iconlist[1][0];
        }
        //个人中心
        if(this.props.action==2){
            icon1 = iconlist[0][0];
            icon2 = iconlist[1][1];
        }

        return (
            <div
                className="footer userfooter"
                >
                <div
                    onClick={()=>{this.clickItem("/userindex")}}
                    className="item"
                    >
                    <span className="img"><img src={icon1} /></span>
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
                    onClick={()=>{this.clickItem("/usercenter")}}
                    className="item"
                    >
                    <span className="img"><img src={icon2} /></span>
                    <span>我的</span>
                </div>
            </div>
    	)
    }
}

export default withRouter(Page);