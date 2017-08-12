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

    pushUrl = (name)=>{
        this.props.history.push(name);
    }

    setStatus = (status)=>{
        this.props.dispatch(set_myorderlistStatus(status));
        //this.getList(status);
    }

    gotoBorrowInfo =(order)=>{
        if(order.orderstatus!==-3){
            this.props.dispatch(set_orderinfo(order));
            //this.pushUrl("/borrowinfo");
            this.pushUrl(`/orderdetail/${order._id}`);
        }
    }

    // getList =(status)=>{
    //     let query = {};
    //     if(status=="已完成"){
    //         query.statusforlender = "已完成";
    //     }else{
    //         query.statusforlender = { $ne: "已完成" };
    //     }
    //     this.props.dispatch(getmyorders_request({query}));
    // }

	render() {
        const { fillerorderlist, myorderlistStatus } = this.props;
        

        return (
            <div className="borrowlistPage AppPage">
                <DocumentTitle title="我的借款" />
        		<Tab style={{height:window.innerHeight+"px"}}>
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
                    <TabBody>
                        {fillerorderlist.length>0?(
                            <Cells>
                                {_.map(fillerorderlist,(order,index)=>{
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
                                                {order.orderstatus===-3 && "超时失效"}
                                                {order.orderstatus!==-3 && order.statusforlender}
                                            </CellBody>
                                            {order.orderstatus!==-3 && <CellFooter/>}
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

const data = ({order:{myorderlistStatus,myorderlist}}) => {
    let newmyorderlist = myorderlist;
    newmyorderlist=_.sortBy(newmyorderlist, [function(o){ 
        if(o.orderstatus<0){
            o.orderstatus=-(o.orderstatus)+4
        }
        return -o.orderstatus;
    }]);
    let fillerorderlist={};
    if(myorderlistStatus==="借款中"){
        fillerorderlist=_.filter(newmyorderlist, function(o) { return o.statusforborrower!=="订单完成"; });
    }
    if(myorderlistStatus==="已完成"){
        fillerorderlist=_.filter(newmyorderlist, function(o) { return o.statusforborrower==="订单完成"; });
    }

    return {fillerorderlist, myorderlistStatus};
};
Page = connect(data)(Page);
export default Page;



