/*
    借款信息
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/borrowlist.css';
import { connect } from 'react-redux';
import moment from "moment";
import _ from "lodash";
import Footer from './footer';
import { 
    getmyorders_request,
    set_myorderlistStatus,
    set_orderinfo
    }  from "../../actions";

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
    LoadMore,
    } = WeUI;

class Page extends Component {

    componentWillMount() {
        this.getList(this.props.myorderlistStatus);
    }

    pushUrl = (name)=>{
        this.props.history.push(name);
    }

    setStatus = (status)=>{
        this.props.dispatch(set_myorderlistStatus(status));
        this.getList(status);
    }

    gotoBorrowInfo =(order)=>{
        this.props.dispatch(set_orderinfo(order));
        this.pushUrl("/borrowinfo");
    }

    getList =(status)=>{
        let query = {};
        if(status=="已完成"){
            query.statusforlender = "订单完成";
        }else{
            query.statusforlender = { $ne: "订单完成" };
        }
        this.props.dispatch(getmyorders_request({query,options:{
                page: 1,
                limit: 100,
        }}));
    }

    render() {
        const { myorderlist, myorderlistStatus } = this.props;
        return (
            <div className="borrowlistPage AppPage">
                <DocumentTitle title="我的借款" />
                <Tab className="borrowlist">
                    <NavBar>
                        <NavBarItem 
                            active={myorderlistStatus=="借款中"}
                            onClick={()=>{this.setStatus("借款中")}}
                            >
                            借款中
                        </NavBarItem>
                        <NavBarItem 
                            active={myorderlistStatus=="已完成"}
                            onClick={()=>{this.setStatus("已完成")}}
                            >
                            已完成
                        </NavBarItem>
                    </NavBar>
                    <TabBody
                        className="list"
                        >
                        {myorderlist.length>0?(
                            <Cells>
                                {_.map(myorderlist,(order,index)=>{
                                    console.log(order);
                                    return (
                                         <Cell
                                            access
                                            key={index}
                                            onClick={()=>{this.gotoBorrowInfo(order);}}
                                            >
                                            <CellHeader>
                                                <div className="userinfo">
                                                    <span className="name">借款额度:{order.moneylimit}</span>
                                                    <span className="name">借款期限:{order.moneyperiod}</span>
                                                    <span className="time">{moment(order.created_at).format('YYYY-MM-DD H:mm:ss')}</span>
                                                </div>
                                            </CellHeader>
                                            <CellBody>
                                                <span>{order.statusforlender}</span>
                                                {order.statusforlender=="放款成功"&&order.moneyreal>0?(
                                                    <span className="color_error">去支付</span>
                                                ):""}
                                                
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
                <Footer action={1}/>
            </div>
        )
    }
}

const data = ({order:{myorderlistStatus,myorderlist}}) => {
    myorderlist = _.sortBy(myorderlist, [function(o){ 
        if(o.orderstatus<0){
            o.orderstatus = -(o.orderstatus)+4
        }
        return -o.orderstatus;
     }]);
    return {myorderlist, myorderlistStatus};
};
Page = connect(data)(Page);
export default Page;