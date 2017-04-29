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
        		<Tab 
                    type="tabbar"
                    >
                    <TabBarItem 
                        icon={<img src={icon1} />} 
                        label="借款信息" 
                        />
                    <TabBarItem 
                        icon={<img src={icon2} />} 
                        label="我的借款"
                        />
                    <TabBarItem 
                        icon={<img src={icon3} />} 
                        label="我的" 
                        />
                </Tab>
            </div>
    	)
    }
}

export default Page;