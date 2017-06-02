 /*
    借款详情-头部借款信息
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import '../../../public/css/borrowinfo.css';
import { connect } from 'react-redux';
import moment from "moment";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import { withRouter } from 'react-router-dom';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter,
    Panel,
    PanelHeader,
    PanelBody,
    MediaBox
    } = WeUI;

class Page extends Component {
    pushUrl = (name)=>{
        this.props.history.push(name);
    }
	render() {
        const { orderinfo } = this.props;
        const usertype = localStorage.getItem('usertype');
        return (
    		<div className="borrowinfoLenderinfo">
                {orderinfo.hasOwnProperty("userlender")?(
        			<div className="loaninfoPage">
                        <Panel>
                            <PanelHeader>
                                放款信息
                            </PanelHeader>
                            <PanelBody>
                                <MediaBox type="text">
                                        <div className="info">
                                            <div>放贷人:{orderinfo.userlender.profile.nickname}</div>
                                            <div>放款时间: {moment(orderinfo.userlender.matched_at).format("YYYY-MM-DD H:mm:ss")}</div>
                                            <div>放款额度: <span className="blue">{orderinfo.moneylender} 元</span></div>
                                            <div>服务费: <span className="green">{orderinfo.feeservice} 元</span></div>
                                            <div>押金比: <span className="green">{orderinfo.depositratio} %</span></div>
                                            {orderinfo.hasOwnProperty("moneyreal")?(
                                                <div>实际放款: <span className="green">{orderinfo.moneyreal} 元</span></div>
                                            ):""}
                                        </div>
                                </MediaBox>
                            </PanelBody>
                        </Panel>
                        {usertype=="userborrow"?(
                            <Cells>
                                <Cell
                                    access
                                    onClick={()=>{this.pushUrl("/borrowshowloaninfo");}}
                                    >
                                    <CellBody>
                                        查看放款人信息
                                    </CellBody>
                                    <CellFooter/>
                                </Cell>
                            </Cells>
                        ):null}
                    </div>
                ):""}
    		</div>
    	)
    }
}
Page = withRouter(Page);
export default Page;