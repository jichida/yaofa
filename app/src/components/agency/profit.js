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
import moment from "moment";
import {
    getrechargerecords_request,
    profit_set_listtype,
    set_orderinfo
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
        this.getList(this.props.profit.set_listtype);
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
        window.clearInterval(this.getlistinterval);
        this.props.dispatch(profit_set_listtype(type));
        let querytype = type===0?"order":"withdrawcash";
        console.log(type);
        console.log(querytype);
        window.setTimeout(()=>{
            this.getlistinterval = window.setInterval(this.getList(type),5000);
        },10)
    }

    gotoBorrowInfo =(order)=>{
        this.props.dispatch(set_orderinfo(order));
        this.pushUrl("/borrowinfo");
    }

	render() {
        const { userlogin,profit,myorderlist,bonuslevel1 } = this.props;
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
                                    const orderinfo = myorderlist[p.fromorder];
                                    const shouyi = parseFloat((bonuslevel1*orderinfo.realprice).toFixed(2));
                                    return (
                                         <Cell access key={index}
                                            onClick={()=>{this.gotoBorrowInfo(orderinfo);}}
                                            >
                                            <CellHeader>
                                                <img src="img/6.png" alt="" />
                                                <div className="userinfo">
                                                    <span className="name">{orderinfo.creator.profile.nickname}</span>
                                                    <span className="time">{moment(orderinfo.pay_at).format("YYYY-MM-DD H:mm:ss")}</span>
                                                </div>
                                            </CellHeader>
                                            <CellBody>
                                                <div>借到 <span className="blue">{orderinfo.moneyreal}</span> 元</div>
                                                <div>收益 <span className="blue">+ {shouyi}</span> 元</div>
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

const data =  ({userlogin,profit,order:{myorderlist},app:{bonuslevel1}}) =>{ return {userlogin,profit,myorderlist,bonuslevel1}};


export default connect(data)(Page);

