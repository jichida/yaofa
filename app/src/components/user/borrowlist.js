/*
    借款信息
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/borrowlist.css';
import Footer from '../footer';

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

	render() {
        return (
            <div className="borrowlistPage AppPage">
        		<Tab>
                    <NavBar>
                        <NavBarItem active={true}>借款中</NavBarItem>
                        <NavBarItem active={false}>已完成</NavBarItem>
                    </NavBar>
                    <TabBody>
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
                    </TabBody>
                </Tab>
                <Footer action={0}/>
            </div>
    	)
    }
}

export default Page;