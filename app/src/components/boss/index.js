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
import { connect } from "react-redux";
import SwiperBanner from '../tools/swiperbanner';
import moment from 'moment';
import {
    set_lender_borrowlist,
    set_lender_borrowlist_filler,
    queryintrestedorder_request,
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
    Form,
    FormCell,
    Select,
    Label,
    Input,
    Switch,
    LoadMore
    } = WeUI;

class Page extends Component {

    headBanner =()=>{
        let data = [
            "img/5.png",
            "img/5.png",
        ]
        return data;
    }

    pushUrl = (name)=>{
        this.props.history.push(name);
    }

    componentWillMount() {
        this.getList();
    }

    gotoBorrowInfo =(borrowinfo)=>{
        this.props.dispatch(set_orderinfo(borrowinfo));
        this.pushUrl("/borrowinfo");
    }

    getList =()=>{
        let query = this.props.borrowlistfiller;
        this.props.dispatch(queryintrestedorder_request({query}))
    }

	render() {
        const {borrowlist,borrowlistfiller} = this.props;
        return (
            <div className="indexPage AppPage">
                <DocumentTitle title="耀发钱庄－放款端" />
        		<SwiperBanner data={this.headBanner()} />
                <div className="pageTitle bossindexfiller">
                    <span>最新借款信息</span>
                    <span 
                        onClick={()=>{this.pushUrl("/bossfiller")}}
                        className="filler sel">
                        筛选
                        <img src="img/7.png" />
                    </span>
                </div>
                <div className="list">
                    {borrowlist.length>0?(
                        <Cells>
                            {
                                _.map(borrowlist, (borrow,index)=>{
                                    return (
                                        <Cell 
                                            access
                                            key={index}
                                            onClick={()=>{this.gotoBorrowInfo(borrow);}}
                                            >
                                            <CellHeader>
                                                <img src="img/6.png" alt="" />
                                                <div className="userinfo">
                                                    <span className="name">borrow.created.profile.nickname</span>
                                                    <span className="time">借款期限: {borrow.moneyperiod}</span>
                                                    <span className="time">发布时间: {moment(borrow.created_at).format('YYYY-MM-DD H:mm:ss')}</span>
                                                    
                                                </div>
                                            </CellHeader>
                                            <CellBody>
                                                <div>借 <span className="blue">{borrow.moneylimit}</span> 元</div>
                                                <div>{borrow.statusforlender}</div>
                                            </CellBody>
                                            <CellFooter/>
                                        </Cell>
                                    )
                                })
                            }
                        </Cells>
                    ):(
                        <LoadMore showLine>暂无数据</LoadMore>
                    )}
                    
                </div>
                <Footer action={0}/>
            </div>
    	)
    }
}

const data = ({userlender:{borrowlist,borrowlistfiller}}) => {
    return {borrowlist,borrowlistfiller};
};
Page = connect(data)(Page);
export default Page;


