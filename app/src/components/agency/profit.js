/*
    我的收益
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/borrowlist.css';
import Footer from './footer';
import _ from "lodash";
import { connect } from 'react-redux';
import {
    getrechargerecords_request,
    profit_set_listtype
} from '../../actions';

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
    LoadMore
    } = WeUI;

class Page extends Component {

    constructor(props) {  
        super(props);  
        this.getlistinterval = null;
    } 

    componentWillMount() {
        this.getlistinterval = window.setInterval(this.getList.bind(this.props.profit.set_listtype),5000);
    }

    componentWillUnmount(){
        window.clearInterval(this.getlistinterval);
    }

    pushUrl = (name)=>{
        this.props.history.push(name);
    }
    
    getList =(status)=>{
        let querytype = status==0?"order":"withdrawcash";
        let payload = {
            query:{
                srctype : querytype
            },
            options:{
                page: 1,
                limit: 100,
            }
        };
        this.props.dispatch(getrechargerecords_request(payload));
    }

    seltype =(type)=>{
        this.props.dispatch(profit_set_listtype(type));

    }

	render() {
        const { userlogin,profit } = this.props;
        return (
            <div className="borrowlistPage profitPage AppPage">
                <DocumentTitle title="借款人详情" />
                <div className="headcontent">
                    <div className="tit">钱包余额</div>
                    <div className="price"><span>{userlogin.balance}</span>元</div>
                    <div
                        className="btn Primary"
                        onClick={()=>{this.pushUrl("/tixian")}}
                    >
                        提现
                    </div>
                </div>
        		<Tab>
                    <NavBar>
                        <NavBarItem 
                            active={profit.set_listtype===0}
                            onClick={()=>{this.seltype(0)}}
                        >
                            收益列表
                        </NavBarItem>
                        <NavBarItem 
                            active={profit.set_listtype===1}
                            onClick={()=>{this.seltype(1)}}
                        >
                            历史提现
                        </NavBarItem>
                    </NavBar>
                    <TabBody>
                        {profit.profitlist.length>0?(
                            <Cells>
                                {_.map(profit.profitlist, (p,index)=>{
                                    console.log(p)
                                    return (
                                         <Cell access key={index}>
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
                                    )
                                })}
                            </Cells>
                            ):(
                                <LoadMore showLine>暂无数据</LoadMore>
                            )}
                           
                            
                    </TabBody>
                </Tab>
            </div>
    	)
    }
}

const data =  ({userlogin,profit}) =>{ return {userlogin,profit};};
export default connect(data)(Page);

