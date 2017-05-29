 /*
    借款详情-头部借款信息
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import '../../../public/css/borrowinfo.css';
import { connect } from 'react-redux';
import moment from "moment";

class Page extends Component {
	render() {
        const { orderinfo, usertype } = this.props;
        return (
    		<div className="borrowinfoHead">
    			<DocumentTitle title="借款详情" />
                <div className="headcontent">
                    <div>借 <span className="quota">{orderinfo.moneylimit}</span> 元</div>
                    <div>借款期限: {orderinfo.moneyperiod}天</div>
                </div>
                <div
                    className="userinfo"
                    onClick={()=>{this.gotoUserBorrowInfo()}}
                    >
                    <img src="img/6.png" />
                    <div>
                        <span><span>借款人:</span>{orderinfo.creator.profile.nickname}</span>
                        <span><span>借款原因:</span>{orderinfo.moneyusefor}</span>
                        <span><span>发布时间:</span>{moment(orderinfo.created_at).format('YYYY-MM-DD H:mm:ss')}</span>
                        <span className="showMoreInfo">查看认证资料</span>
                    </div>
                </div>
    		</div>
    	)
    }
}
export default Page;