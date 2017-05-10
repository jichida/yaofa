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

    pushUrl = (name)=>{
        this.props.history.push(name);
    }

	render() {

        let iconlist = {
            0 : ["img/1.png", "img/2.png"],
            1 : ["img/38.png", "img/37.png"],
            2 : ["img/3.png", "img/4.png"],
        };

        let icon1 = iconlist[0][0];
        let icon2 = iconlist[1][0];
        let icon3 = iconlist[2][0];

        //首页
        if(this.props.action==0){
            icon1 = iconlist[0][1];
        }
        //借款列表
        if(this.props.action==1){
            icon2 = iconlist[1][1];
        }
        //个人中心
        if(this.props.action==2){
            icon3 = iconlist[2][1];
        }

        return (
            <div
                className="footer"
                >
                <div
                    onClick={()=>{this.pushUrl("")}}
                    className="item"
                    >
                    <img src={icon1} />
                    <span>借款信息</span>
                </div>
                <div
                    onClick={()=>{this.pushUrl("")}}
                    className="item"
                    >
                    <img src={icon2} />
                    <span>我的放款</span>
                </div>
                <div
                    onClick={()=>{this.pushUrl("/bossusercenter")}}
                    className="item"
                    >
                    <img src={icon3} />
                    <span>我的</span>
                </div>
            </div>
    	)
    }
}

export default withRouter(Page);