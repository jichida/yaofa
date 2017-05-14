/*
    借款列表
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/borrowlist.css';
import _ from "lodash";
import moment from "moment";
import Footer from './footer';
import { connect } from 'react-redux';
import {
    getmyorders_request,
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
    CellFooter
    } = WeUI;



class Page extends Component {
    componentWillMount() {
        this.props.dispatch(getmyorders_request({
            query:{

            },
            options:{
                page: 1,
                limit: 100,
            }
        }));
    }
    pushUrl = (name)=>{
        this.props.history.push(name);
    }
    gotoBorrowInfo =(order)=>{
        this.props.dispatch(set_orderinfo(order));
        this.pushUrl("/borrowinfo");
    }

    render() {
        const { myorderlist } = this.props;
        return (
            <div className="borrowlistPage AppPage">
                <Tab>
                    <NavBar>
                        <NavBarItem active={true}>借款中</NavBarItem>
                        <NavBarItem active={false}>已完成</NavBarItem>
                    </NavBar>
                    <TabBody className="list"
                        style={{overflow:"scoll",flexGrow:"1"}}
                        >
                        {myorderlist.length>0?(
                            <Cells>
                                {
                                    _.map(myorderlist, (order,index)=>{

                                        return (
                                            <Cell
                                                access
                                                key={index}
                                                onClick={()=>{
                                                    this.gotoBorrowInfo(order);
                                                }}
                                                >
                                                <CellHeader>
                                                    <div className="userinfo">
                                                        <span className="name">借款额度:{order.moneylimit}</span>
                                                        <span className="name">借款期限:{order.moneyperiod}</span>
                                                        <span className="time">{moment(order.created_at).format('YYYY-MM-DD H:mm:ss')}</span>
                                                    </div>
                                                </CellHeader>
                                                <CellBody>
                                                    {order.statusforlender}
                                                </CellBody>
                                                <CellFooter/>
                                            </Cell>
                                        )
                                    })
                                }
                            </Cells>
                        ):(
                            <div className="nodata">
                                <img src="img/21.png" />
                                <span>当前您暂无借款记录</span>
                                <botton 
                                    className="btn Primary"
                                    >
                                    立刻发布借款信息
                                </botton>
                            </div>
                        )}
                    </TabBody>
                </Tab>
                <Footer action={1}/>

            </div>
        )
    }
}

const data = ({userlender:{myorderlist}}) => {
    myorderlist = _.sortBy(myorderlist, [function(o) { return -(new Date(o.created_at)).getTime(); }]);
    return {myorderlist};
};
Page = connect(data)(Page);
export default Page;

