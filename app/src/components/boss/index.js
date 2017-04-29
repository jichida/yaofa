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
    CellFooter,
    Form,
    FormCell,
    Select,
    Label,
    Input,
    Switch
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
                <div className="pageTitle bossindexfiller">
                    <span>最新借款信息</span>
                    <span className="filler sel">
                        筛选
                        <img src="img/7.png" />
                    </span>
                </div>
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
                </div>
                
                <div className="fillerBox">
                    <Form>
                        
                        <FormCell>
                            <CellHeader>花呗分值</CellHeader>
                            <CellBody>
                                <Input type="tel" placeholder="请输入花呗额度"/>
                            </CellBody>
                            <CellFooter>
                                分
                            </CellFooter>
                        </FormCell>
                        <FormCell switch>
                            <CellHeader>花呗有无</CellHeader>
                            <CellFooter>
                                <Switch />
                            </CellFooter>
                        </FormCell>
                        <FormCell>
                            <CellHeader>借贷宝负债</CellHeader>
                            <CellBody>
                                <Input type="tel" placeholder="请输入借贷宝负债金额"/>
                            </CellBody>
                            <CellFooter>
                                元
                            </CellFooter>
                        </FormCell>
                        <FormCell select selectPos="after">
                            <CellHeader>手机实名时间</CellHeader>
                            <CellBody>
                                <Select data={[
                                    {
                                        value: 1,
                                        label: '1年'
                                    },
                                    {
                                        value: 2,
                                        label: '2年'
                                    },
                                    {
                                        value: 3,
                                        label: '3年'
                                    }
                                ]} />
                            </CellBody>
                        </FormCell>
                        <FormCell select selectPos="after">
                            <CellHeader>
                                <Label>手机实名时间</Label>
                            </CellHeader>
                            <CellBody>
                                <Select data={[
                                    {
                                        value: 1,
                                        label: 'China'
                                    },
                                    {
                                        value: 2,
                                        label: 'United States'
                                    },
                                    {
                                        value: 3,
                                        label: 'Germany'
                                    }
                                ]} />
                            </CellBody>
                        </FormCell>

                    </Form>

                    <div className="btn Primary">
                        确定
                    </div>

                </div>
                <Footer action={0}/>
            </div>
    	)
    }
}

export default Page;