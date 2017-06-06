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
import Borrowinfohead from "./borrowinfo_head";
import BorrowinfoLenderinfo from "./borrowinfo_lenderinfo";
import _ from "lodash";

import {
    set_borrowinfo,
    set_addloanid,
    confirmorder_request,
    set_orderinfo,
    set_weui,
    lender_set_ui_endorder,
    lender_set_endorder_status,
    lender_set_moneyreal,
    borrow_ui_sureorder,
    payorder_request,
    insertcancelorderrecord_request,
    gettodaycancelorderrecord_request,
    fillrealnameprofile_request,
    getmyorders_request
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
    MediaBox,
    MediaBoxDescription,
    CellsTitle
    } = WeUI;

const orderstatusArray ={
    //分别是商家的状态、借款人的状态、中介的状态
    0 : ["发布中...","发布中...","发布中..."],
    1 : ["等待借款人确认","待确认","已接单"],
    2 : ["用户已确认，请尽联系用户进行放贷","借款确认订单，等待商家联系您...","订单已确认"],//商家需要填写放款金额   //放款失败
    3 : ["成功放款","商家已完成放款","商家已完成放款"],//用户确认放款金额  //或选择放款失败
    4 : ["已完成","已完成","已完成"],
    5 : ["订单异常","订单异常","订单异常"],//用户举报放款金额
    6 : ["放款失败","放款失败","放款失败"],//等待平台审核
}

//商家端操作弹窗
class LenderConfirminput extends Component {

    componentWillMount(){
        this.props.dispatch(lender_set_ui_endorder(false));
    }

    constructor(props) {
        super(props);
        this.state = {
            moneyreal : 0
        }
    }
    //关闭窗口
    close=()=>{
        this.props.dispatch(lender_set_ui_endorder(false))
    }
    //完成借款
    lenderEndOrder=()=>{
        let success = this.props.endorder_status;
        let payload = {};
        let cancelnum = this.props.cancelnum;
        if(success){
            if(this.state.moneyreal>0){
                payload = {
                    query:{_id:this.props.orderid},
                    data:{
                        moneyreal : this.state.moneyreal,
                        orderstatus : 3
                    }
                };
            }else{
                let toast = {
                    show : true,
                    text : "放款金额不能为0",
                    type : "warning"
                }
                this.props.dispatch(set_weui({toast}));
            }
        }else{
            //商家操作放款失败
            //插入一次失败订单表
            const { dispatch,orderid } = this.props;
            payload = {
                query:{_id:orderid},
                data:{
                    orderstatus : -2
                }
            };
            //当前第二次放款失败
            if(cancelnum==1){
                //this.props.dispatch(fillrealnameprofile_request({data:{canaccept: false}}));
                payload.data.realprice = 20;
                this.props.dispatch(fillrealnameprofile_request({data:{canacceptreason: "达到2次的放款失败"}}));
            }
            //当前第一次放款失败
            if(cancelnum==0){
                this.props.dispatch(fillrealnameprofile_request({data:{canaccept: true}}));
            }
            this.props.dispatch(insertcancelorderrecord_request({orderid:orderid}));
            
        }
        this.props.dispatch(confirmorder_request(payload));
        
    }


    inputOnchange=(e)=>{
        let val = e.target.value;
        this.setState({moneyreal : val});
    }

    render(){
        const {
            ui_endorder,
            endorder_status
            } = this.props;
        return(
            <div
                className="LenderConfirminput"
                style={{display:ui_endorder?"block":"none"}}
                >
                <div className="weui-mask"></div>
                <div className="weui-dialog" id="weuiConfirm">
                    <div className="weui-dialog__bd">
                        {endorder_status?(
                            <div>
                                <input
                                    name="moneyreal"
                                    type="number"
                                    placeholder="请输入实际借款金额"
                                    onChange={(e)=>{this.inputOnchange(e)}}
                                    />
                                <div style={{paddingTop:"15px"}}>我们会审核该信息，如有乱填和被举报的现象，一经查实，系统将取消您的放贷权限</div>
                            </div>
                        ):(
                            <div className="falseContent">
                                <div className="tit" style={{fontSize:"20px"}}>放款失败</div>
                                <div className="cont" >请确保您所反馈的信息真实性,谢谢您的使用</div>
                            </div>
                        )}
                    </div>
                    <div className="weui-dialog__ft">
                        <a
                            className="weui-dialog__btn weui-dialog__btn_default"
                            onClick={this.close}
                            >
                            取消
                        </a>
                        <a
                            className="weui-dialog__btn weui-dialog__btn_primary"
                            onClick={()=>{this.lenderEndOrder()}}
                            >
                            确定
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
const data1 = ({
    userlender:{
        ui_endorder,
        endorder_status,
        bosscancelorder
    },
    order:{
        myorderlist
    }
}) => {
    //created_at creator order
    //获取是否当前用户已经取消过几次订单
    let new_bosscancelorder = [];
    let nowtime = (new Date()).getTime();
    let cancelnum = 0;
    let first_cancel = {};
    let second_cancel = {};
    let first_pay = false;
    let second_pay = false;
    //按照时间排序
    if(bosscancelorder.length>0){
        new_bosscancelorder = _.sortBy(bosscancelorder, [function(o) { return -(new Date(o.created_at)).getTime(); }]);
        //cancelnum = bosscancelorder.length;
    }
    //最近的两条取消记录

    if(new_bosscancelorder.length>1){ 
        second_cancel = myorderlist[new_bosscancelorder[1].order];
        second_pay = second_cancel.hasOwnProperty("pay_at")|| !!second_cancel.pay_at;
        if(second_pay){
            cancelnum = 1;
        }else{
            if(first_pay){

            }else{
                cancelnum = 1;
            }
        }
    }

    // if(new_bosscancelorder.length>0){ 
    //     first_cancel = myorderlist[new_bosscancelorder[0].order];
    //     first_pay = first_cancel.hasOwnProperty("pay_at")|| !!first_cancel.pay_at;
    //     if()
    // }

    return {ui_endorder,endorder_status,cancelnum};
};
LenderConfirminput = connect(data1)(LenderConfirminput);
export {LenderConfirminput};





//借款人端操作弹窗
//borrow_ui_sureorder
//ui_sureorder

class BorrowConfirminput extends Component {
    //关闭窗口
    close=()=>{
        this.props.dispatch(borrow_ui_sureorder(false))
    }
    //确认信息无误
    SureOrder=()=>{
        let payload = {
            query:{_id:this.props.orderinfo._id},
            data:{
                orderstatus : 4
            }
        };
        this.props.dispatch(confirmorder_request(payload));
    }
    //举报商家
    Jubao=()=>{
        this.props.history.push("/tousu");
    }
    render(){
        const { orderinfo, showBorrowConfirminput } = this.props;
        let showorderstatus = 0;
        if(orderinfo.hasOwnProperty("_id")){
            showorderstatus = orderinfo.orderstatus>=0?orderinfo.orderstatus:((-orderinfo.orderstatus)+4);
        }
        return(
            <div
                className="BorrowConfirminput"
                style={{display:showBorrowConfirminput?"block":"none"}}
                >
                <div className="weui-mask"></div>
                <div className="weui-dialog" id="weuiConfirm">
                    <div className="weui-dialog__bd">
                        <div className="falseContent">
                            <div className="tit" style={{fontSize:"20px"}}>
                                {orderstatusArray[showorderstatus][1]}
                            </div>
                            {orderinfo.orderstatus==3?(
                                <div className="cont">
                                    实际放款金额：{orderinfo.moneyreal}元
                                </div>
                            ):""}

                        </div>
                    </div>
                    <div className="weui-dialog__ft">
                        <a
                            className="weui-dialog__btn weui-dialog__btn_default"
                            onClick={this.Jubao.bind(this)}
                            >
                            举报
                        </a>
                        <a
                            className="weui-dialog__btn weui-dialog__btn_primary"
                            onClick={this.SureOrder}
                            >
                            确认无误
                        </a>
                    </div>
                    <div className="promptinfo color_warning">
                        如信息不实，请举报商家，举报属实，平台将现金回报。
                    </div>
                </div>
            </div>
        )
    }
}

const data2 = ({
    userborrow:{
        ui_sureorder
        }}) => {
    return {ui_sureorder};
};
BorrowConfirminput = connect(data2)(BorrowConfirminput);
BorrowConfirminput = withRouter(BorrowConfirminput);
export {BorrowConfirminput};

class GetBorrowStatusInfo extends Component{

    //商家确认接单
    gotoBossaddloan=(id)=>{
        this.props.dispatch(set_addloanid(id));
        this.props.history.push("/bossaddloan");
    }

    //用户同意接受
    borrowAggreelender=(id)=>{
        let payload = {
            query:{_id:id},
            data:{
                orderstatus : 2
            }
        };
        this.props.dispatch(set_weui({confirm:{
            show : true,
            title : "接受借款",
            text : "同意借款后，我们会将您的联系方式发送给商家",
            buttonsCloseText : "取消",
            buttonsClickText : "确定",
            buttonsClick : ()=>{this.props.dispatch(confirmorder_request(payload))}
        }}))

    }

    //商家接单
    lenderGetOrder=(id)=>{
        let lenderstatus = this.props.canaccept;
        //queryacceptstatus
        if(lenderstatus){
            this.props.dispatch(set_weui({confirm:{
                show : true,
                title : "放款抢单",
                text : "抢单后必须完成此单，才能接其他订单",
                buttonsCloseText : "取消",
                buttonsClickText : "确定",
                buttonsClick : ()=>{this.gotoBossaddloan(id)}
            }}))
        }else{
            let toast = {
                show : true,
                text : this.props.canacceptreason || "通过审核后才能接单",
                type : "warning"
            }
            this.props.dispatch(set_weui({toast}));
            if(this.props.canacceptreason==="达到2次的放款失败"){
                this.props.dispatch(set_weui({confirm:{
                    show : true,
                    title : "开通接单功能",
                    text : "您已经达到每天2次的限定，需要支付平台20元开通接单功能",
                    buttonsCloseText : "取消",
                    buttonsClickText : "去支付",
                    buttonsClick : ()=>{this.goPay(this.props.first_cancel_order)}
                }}))
            }
        }
    }

    //完成放款
    show_LenderConfirminput=(status)=>{
        this.props.dispatch(lender_set_endorder_status(status));
        this.props.dispatch(lender_set_ui_endorder(true));
    }
    goPay =(orderinfo)=>{
        //moneyreal
        //realprice 
        //percentborrowpre
        //percentborrowreal
        //与借款的10% ＋ 实际借款的10%
        //parseFloat((percentborrowpre/100).toFixed(2));
        const { percentborrowreal,percentborrowpre } = this.props;
      
        orderinfo.realprice = orderinfo.moneyreal * parseFloat((percentborrowreal/100).toFixed(2));
        let realpricepre = orderinfo.moneylender * parseFloat((percentborrowpre/100).toFixed(2));

        if(orderinfo.moneyreal<orderinfo.moneylender){
            orderinfo.realprice = (orderinfo.realprice + realpricepre)*0.5;
        }
        orderinfo.realprice = parseFloat((orderinfo.realprice).toFixed(2));
        this.props.dispatch(payorder_request({
            query:{_id:orderinfo._id},
            data:{realprice:orderinfo.realprice}
        }));
    }

    render(){
        const {orderInfo} = this.props;
        let usertype = localStorage.getItem('usertype');
        let showorderstatus = 0;
        let hasorderinfo = false;
        if(orderInfo.hasOwnProperty("_id")){
            showorderstatus = orderInfo.orderstatus>=0?orderInfo.orderstatus:((-orderInfo.orderstatus)+4);
            hasorderinfo = true;
        }

        return (

                <div className="getBorrowStatusInfo btn">
                    {
                        //放款人
                        usertype=="userlender"?(

                            <div className="cont">
                                <span className="info color_warning">{orderstatusArray[showorderstatus][0]}</span>
                                {
                                    //抢单
                                    orderInfo.orderstatus==0?(
                                        <span
                                            className="btn Primary"
                                            onClick={()=>{this.lenderGetOrder(orderInfo._id)}}
                                            >放贷抢单</span>
                                    ):""
                                }
                                {
                                    //用户已经确认，获取用户联系方式
                                    orderInfo.orderstatus==2?(
                                        <div className="btnlist">
                                            <div className="btn Primary phonelnk">
                                                <a href={"tel:"+orderInfo.creator.username}>联系借款人</a>
                                            </div>
                                            <div className="btnli">
                                                <div
                                                    className="btn Success"
                                                    onClick={()=>{this.show_LenderConfirminput(true)}}
                                                    >
                                                    完成放款
                                                </div>
                                                <div
                                                    className="btn Default"
                                                    onClick={()=>{this.show_LenderConfirminput(false)}}
                                                    >
                                                    放款失败
                                                </div>
                                            </div>
                                            <LenderConfirminput orderid={orderInfo._id}/>
                                        </div>
                                    ):""
                                }
                                {
                                    orderInfo.orderstatus>=3&&orderInfo.moneyreal>0&&orderInfo.paystatus!="已支付"?(
                                        <div className="payorget">
                                            <Cells>
                                                <Cell>
                                                    <CellBody>
                                                        订单收费
                                                    </CellBody>
                                                    <CellFooter>
                                                        <button onClick={()=>{
                                                          this.goPay(orderInfo);
                                                        }}
                                                            className="btn Primary"
                                                            style={{margin:0}}
                                                            ><span>去支付</span></button>
                                                    </CellFooter>
                                                </Cell>
                                            </Cells>
                                            <CellsTitle>
                                                支付后才能继续接单,点击查看
                                                <span className="blue"
                                                    onClick={()=>{this.pushUrl("/abouthtml/feeminu")}}
                                                >收费标准说明</span>
                                            </CellsTitle>
                                        </div>
                                    ):""
                                }

                            </div>
                        ):""
                    }
                    {
                        //借款人
                        usertype=="userborrow"?(
                            <div className="cont">
                                <span className="info">{orderstatusArray[showorderstatus][1]}</span>
                                {
                                    //商家已接单，等待用户确认
                                    orderInfo.orderstatus==1?(
                                        <span
                                            className="btn Primary"
                                            onClick={()=>{this.borrowAggreelender(orderInfo._id)}}
                                            >
                                            接受借款
                                        </span>
                                    ):""
                                }
                                <BorrowConfirminput
                                    orderinfo={orderInfo}
                                    showBorrowConfirminput={orderInfo.orderstatus==3||orderInfo.orderstatus==-2}
                                    />
                            </div>
                        ):""
                    }
                    {
                        //中介
                        usertype=="useragency"?(
                            <div className="cont">
                                <div className="info">{orderstatusArray[orderInfo.orderstatus][2]}</div>

                                {
                                    orderInfo.orderstatus>=3&&orderInfo.moneyreal>0&&orderInfo.paystatus=="已支付"?(
                                        <div className="payorget">
                                            <Cells>
                                                <Cell>
                                                    <CellBody>
                                                        收益
                                                    </CellBody>
                                                    <CellFooter>
                                                        <button
                                                            className="btn Primary"
                                                            ><span>去提现</span></button>
                                                    </CellFooter>
                                                </Cell>
                                            </Cells>
                                            <CellsTitle>
                                                点击查看
                                                <span className="blue"
                                                    onClick={()=>{this.pushUrl("/abouthtml/feepuls")}}
                                                >受益规则</span>
                                            </CellsTitle>
                                        </div>
                                    ):""
                                }
                            </div>
                        ):""
                    }

                </div>
        )
    }
}
const dataGetBorrowStatusInfo = ({
    userlogin:{canaccept,canacceptreason},
    app:{percentborrowreal,percentborrowpre},
    userlender:{bosscancelorder},
    order:{myorderlist}
}) => {
    let new_bosscancelorder = [];
    let nowtime = (new Date()).getTime();
    let first_cancel_order = {};
    //按照时间排序
    if(bosscancelorder.length>0){
        new_bosscancelorder = _.sortBy(bosscancelorder, [function(o) { return -(new Date(o.created_at)).getTime(); }]);
    }
    if(new_bosscancelorder.length>0){ 
        first_cancel_order = myorderlist[new_bosscancelorder[0].order];
        first_cancel_order.realprice = 20;
    }

    return {canaccept,canacceptreason,percentborrowreal,percentborrowpre,first_cancel_order};
};
GetBorrowStatusInfo = connect(dataGetBorrowStatusInfo)(GetBorrowStatusInfo);
GetBorrowStatusInfo = withRouter(GetBorrowStatusInfo);

class Page extends Component {
    pushUrl = (name)=>{
        this.props.history.push(name);
    }
    //usertypes
    componentWillMount(){
        if(this.props.usertypes==="userlender"){
            //商家端获取商家放款失败的次数
            this.props.dispatch(gettodaycancelorderrecord_request({}));
        }
        this.props.dispatch(getmyorders_request({
            query : {},
            options:{
                page: 1,
                limit: 100,        
            }
        }));
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
    			<Borrowinfohead orderinfo={orderInfo} />
                <BorrowinfoLenderinfo orderinfo={orderInfo} />
                <GetBorrowStatusInfo orderInfo={orderInfo}/>
    		</div>
    	)
    }
}

//dispatch(gettodaycancelorderrecord());
const data = ({order:{orderInfo,myorderlist}, app:{percentborrowreal,percentborrowpre}}) => {
    let neworderInfo = orderInfo;
    let usertypes = localStorage.getItem('usertype');
    let myneworderInfo = myorderlist[orderInfo._id];
    if(myneworderInfo){
        neworderInfo = myneworderInfo;
    }
    return { orderInfo:neworderInfo, percentborrowreal, percentborrowpre, usertypes };
};
Page = connect(data)(Page);
export default Page;




