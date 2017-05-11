    /*
    借款详情
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/borrowinfo.css';
import { connect } from 'react-redux';
import moment from "moment";
import { withRouter } from 'react-router-dom';
import { 
    set_borrowinfo,
    set_addloanid
    }  from "../../actions";
const { 
    Cells,
    Cell,
    CellBody,
    CellHeader,
    CellFooter,
    Panel,
    PanelHeader,
    PanelBody,
    MediaBox
    } = WeUI;

const orderstatusArray ={
    0 : ["借款中","借款中"],
    1 : ["已接单","待确认"],
    2 : ["用户已认同","放款中"],//商家需要填写放款金额
    3 : ["成功放款","待确认"],
    4 : ["已完成","已成功"],
    5 : ["放款失败","放款失败"],
    5 : ["放款失败","放款失败"],
}

class GetBorrowStatusInfo extends Component{

    gotoBossaddloan=(id)=>{
        this.props.dispatch(set_addloanid(id));
        this.props.history.push("/bossaddloan");
    }

    render(){
        const {orderInfo} = this.props;
        let usertype = localStorage.getItem('usertype');
        return (
            <div className="getBorrowStatusInfo btn">
                {usertype=="userlender"?(
                    <div
                        onClick={()=>{this.gotoBossaddloan(orderInfo._id)}}
                        >
                        {orderstatusArray[orderInfo.orderstatus]}
                        ***{orderInfo._id}
                    </div>
                ):""}
                {usertype=="userborrow"||usertype=="userlender"?(
                    <div>
                        {orderstatusArray[orderInfo.orderstatus]}
                        {orderInfo._id}
                    </div>
                ):""}
            </div>
        )
    }
}
GetBorrowStatusInfo = connect()(GetBorrowStatusInfo);
GetBorrowStatusInfo = withRouter(GetBorrowStatusInfo);

// moneyusefor
// orderstatus 1:借款中,借款中  2:已接单／待确认
// paystatus
// statusforborrower
// statusforlender

class Page extends Component {

    pushUrl = (name)=>{
        this.props.history.push(name);
    }

    gotoUserBorrowInfo=(usertype)=>{
        //这里需要更具用户id获取用户借贷信息
        //this.props.dispatch(set_borrowinfo(info));
        this.pushUrl("/borrowuserinfo");
    }

	render() {
        const { orderInfo } = this.props;
        return (
    		<div className="borrowinfoPage AppPage">
    			<DocumentTitle title="借款详情" />

                <div className="headcontent">
                    <div>借 <span className="quota">{orderInfo.moneylimit}</span> 元</div>
                    <div>借款期限: {orderInfo.moneyperiod}天</div>
                </div>

                
                <div 
                    className="userinfo"
                    onClick={()=>{this.gotoUserBorrowInfo()}}
                    >
                    <img src="img/6.png" />
                    <div>
                        <span><span>借款人:</span>orderInfo.creator.profile</span>
                        <span><span>借款原因:</span>{orderInfo.moneyusefor}</span>
                        <span><span>发布时间:</span>{moment(orderInfo.created_at).format('YYYY-MM-DD H:mm:ss')}</span>
                    </div>
                </div>
                
                <GetBorrowStatusInfo orderInfo={orderInfo}/>


                {orderInfo.hasOwnProperty("userlender")?(
                    <Panel>
                        <PanelHeader>
                            借款纪录
                        </PanelHeader>
                        <PanelBody>
                            <MediaBox type="small_appmsg">
                                <Cells>
                                    <Cell access>
                                        <CellBody>
                                            <p>
                                                <span>放贷人:牛魔王</span>
                                                <span className="gray">放款时间: 2017-09-09</span>
                                            </p>
                                        </CellBody>
                                        <CellFooter>
                                            <p>
                                                <span>放款 <span className="blue">{orderInfo.moneylender}</span> 元</span>
                                                <span className="color_warning">待确认</span>
                                            </p>
                                        </CellFooter>
                                    </Cell>
                                </Cells>
                            </MediaBox>
                        </PanelBody>
                    </Panel>
                ):""}
                
    		</div>
    	)
    }
}

const data = ({order:{orderInfo}}) => {
    console.log(orderInfo);
    //usertype: userborrow  useragency  userlender
    return {orderInfo};
};
Page = connect(data)(Page);
export default Page;



