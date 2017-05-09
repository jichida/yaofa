/*
    借款信息
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/index.css';
import Footer from './footer';
import SwiperBanner from '../tools/swiperbanner';

const { 
    Tab,
    NavBar,
    NavBarItem,
    TabBody,
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter
    } = WeUI;

class Page extends Component {

    headBanner =()=>{
        let data = [
            "img/5.png",
            "img/5.png",
        ]
        return data;
    }

	render() {
        return (
            <div className="indexPage AppPage">
        		<SwiperBanner data={this.headBanner()} />
                <div className="pageTitle"><span>我的最新借款</span></div>
                <div className="list">
                    <Cells>
                        <Cell access>
                            <CellHeader>
                                <img src="img/6.png" alt="" />
                                <div className="userinfo">
                                    <span className="name">爱喝水的宝宝</span>
                                    <span className="time">2017-09-09</span>
                                </div>
                            </CellHeader>
                            <CellBody>
                                <div>借 <span className="blue">30,000</span> 元</div>
                                <div>已借到 <span className="blue">10,000</span> 元</div>
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                    </Cells>

                    <div className="nodata">
                        <img src="img/21.png" />
                        <span>当前您暂无借款记录</span>
                        <botton className="btn Primary">立刻发布借款信息</botton>
                    </div>
                </div>
                <Footer action={1}/>
            </div>
    	)
    }
}

export default Page;