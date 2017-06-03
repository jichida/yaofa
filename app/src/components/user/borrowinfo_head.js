 /*
    借款详情-头部借款信息
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import '../../../public/css/borrowinfo.css';
import { connect } from 'react-redux';
import moment from "moment";
import { withRouter } from 'react-router-dom';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
const {
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Input,
    Label
    } = WeUI;

class Page extends Component {

    pushUrl = (name)=>{
        this.props.history.push(name);
    }

	render() {
        const { orderinfo, usertype, userlogin } = this.props;
        const usertypes = localStorage.getItem('usertype');
        return (
    		<div className="borrowinfoHead">
    			<DocumentTitle title="借款详情" />
                <div className="headcontent">
                    <div>借 <span className="quota">{orderinfo.moneylimit}</span> 元</div>
                    <div>借款期限: {orderinfo.moneyperiod}天</div>
                </div>
                <div className="userinfo">
                    <img src="img/6.png" />
                    <div>
                        <span><span>借款人:</span>{orderinfo.creator.profile.nickname}</span>
                        <span><span>借款原因:</span>{orderinfo.moneyusefor}</span>
                        <span><span>发布时间:</span>{moment(orderinfo.created_at).format('YYYY-MM-DD H:mm:ss')}</span>
                    </div>
                </div>
                {
                    usertypes==="userlender"&&userlogin.canaccept?(
                        <Cells>
                            <Cell
                                access
                                onClick={()=>{this.pushUrl("/loanshowborrowinfo");}}
                                >
                                <CellBody>
                                    借款人认证资料
                                </CellBody>
                                <CellFooter/>
                            </Cell>
                        </Cells>
                    ):""
                }
    		</div>
    	)
    }
}
const data = ({userlogin}) => {
    return {userlogin};
};
Page = connect(data)(Page);
Page = withRouter(Page);
export default Page;