import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import withRouter from 'react-router-dom/withRouter';

class Page extends Component {

    pushUrl = (name)=>{
        this.props.history.push(name);
    }

	render() {

        let iconlist = {
            0 : ["img/28.png", "img/29.png"],
            1 : ["img/1.png", "img/2.png"],
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
                    onClick={()=>{this.pushUrl("/agencyindex")}}
                    className="item"
                    >
                    <span className="img"><img src={icon1} /></span>
                    <span>邀请列表</span>
                </div>
                <div
                    onClick={()=>{this.pushUrl("/agencyborrowlist")}}
                    className="item"
                    >
                    <span className="img"><img src={icon2} /></span>
                    <span>借贷订单</span>
                </div>
                <div
                    onClick={()=>{this.pushUrl("/agencyusercenter")}}
                    className="item"
                    >
                    <span className="img"><img src={icon3} /></span>
                    <span>我的</span>
                </div>
            </div>
    	)
    }
}
export default withRouter(Page);