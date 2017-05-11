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
import _ from "lodash";
import { connect } from 'react-redux';
import SwiperBanner from '../tools/swiperbanner';
import moment from "moment";
import { 
    getmyorders_request,
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

    componentWillMount() {
        this.props.dispatch(getmyorders_request({
            query:{

            },
            options:{
                page: 1,
                limit: 2,
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
            <div className="indexPage AppPage">
                <DocumentTitle title="耀发钱庄" />
        		<SwiperBanner data={this.headBanner()} />
                <div className="pageTitle">
                    <span>我的最新借款</span>
                    <span 
                        className="rightlnk"
                        onClick={()=>{this.pushUrl("/borrowlist")}}
                        >查看全部</span>
                </div>
                <div className="list">
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
                </div>
                <Footer action={1}/>
            </div>
    	)
    }
}

const data = ({userborrow:{myorderlist}}) => {
    myorderlist = _.sortBy(myorderlist, [function(o) { return -(new Date(o.created_at)).getTime(); }]);
    return {myorderlist};
};
Page = connect(data)(Page);
export default Page;

