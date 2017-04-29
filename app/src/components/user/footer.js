import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
const {
    Tab,
    TabBarItem,
    Article,
    } = WeUI;

class Page extends Component {

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
                className="footer"
                >
        		<Tab 
                    type="tabbar"
                    >
                    <TabBarItem 
                        icon={<img src={icon1} />} 
                        label="借款纪录" 
                        />
                    <TabBarItem 
                        icon={<span></span>} 
                        label="我要借款" 
                        className="addBorrowLnk"
                        />
                    <TabBarItem 
                        icon={<img src={icon2} />} 
                        label="我的" 
                        />
                </Tab>
            </div>
    	)
    }
}

export default Page;