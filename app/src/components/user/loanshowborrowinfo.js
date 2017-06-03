/*
    个人中心-用户认证信息
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/borrowlist.css';
import '../../../public/css/uservalidationinfo.css';
import { connect } from 'react-redux';
import moment from "moment";
import _ from "lodash";
import $ from "jquery";
import { withRouter } from 'react-router-dom';
import { requestUrlGet } from '../../util/util';
import config from '../../env/config';
import { 
    getmyorders_request,
    set_myorderlistStatus,
    set_orderinfo,
    set_weui
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

// {
//     "cardno": "321283198505066819", 
//     "birthday": "1985-05-06", 
//     "sex": "M", 
//     "name": "焦文晖", 
//     "address": "江苏省泰州市泰兴市"
// }


class PhoneInfo extends Component {
    constructor(props) {
        super(props);  
        this.state = {
            datainfo : {},
            showinfo : false
        };
    }
    componentWillMount () {
        this.getlist();
    }
    getlist =()=>{
        if(this.props.data){
            $.ajax({
                type: "GET",
                dataType: "json", 
                url : config.serverurl + this.props.data,
                success: (msg, status)=>{
                    this.setState({datainfo : msg});
                    this.setState({showinfo : true})
                }
            });
        }
    }
    render(){
        const { data,history } = this.props;
        
// "phoneInfo": {
//     "balance": 11.55,
//     "basicMonthFee": 0,
//     "inNetDate": "20160418",
//     "pointValue": "1845",
//     "realMoney": 14.97,
//     "serviceLevel": "",
//     "status": "在用"
// },
        if(this.state.showinfo){
            const { phoneInfo,phone_no,status,userInfo } = this.state.datainfo;
            return (
                <div className="pageInfo">
                    <Cells>
                        <Cell>
                            <CellBody>
                                开户时间
                            </CellBody>
                            <CellFooter>
                                {phoneInfo.inNetDate}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                号码
                            </CellBody>
                            <CellFooter>
                                {phone_no}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                余额
                            </CellBody>
                            <CellFooter>
                                {phoneInfo.balance}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                状态
                            </CellBody>
                            <CellFooter>
                                {phoneInfo.status}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                姓名
                            </CellBody>
                            <CellFooter>
                                {userInfo.name}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                地址
                            </CellBody>
                            <CellFooter>
                                {userInfo.addr}
                            </CellFooter>
                        </Cell>
                    </Cells>
                </div>
            )
        }else{
            return (
                <div className="nodata">
                    <span>Ta还没有通过该项认证</span>
                </div>
            )
        }
    }
}
PhoneInfo = withRouter(PhoneInfo);


// "phoneInfo": {
//     "balance": 11.55,
//     "basicMonthFee": 0,
//     "inNetDate": "20160418",
//     "pointValue": "1845",
//     "realMoney": 14.97,
//     "serviceLevel": "",
//     "status": "在用"
// },
// "phone_no": "18015282504",
// "smsDetail": [],
// "status": 1,
// "token": "0581d9ca-478b-11e7-97a9-00163e0372c4",
// "userInfo": {
//     "addr": "江苏省泰兴市蒋华镇振华西路28号",
//     "certNo": "321************819",
//     "name": "焦文晖"
// }

class TaobaoInfo extends Component {
    
    constructor(props) {  
        super(props);  
        this.state = {
            datainfo : "",
            showinfo : false
        };
    }

    componentWillMount () {
        this.getlist();
    }
    getlist =()=>{
        if(this.props.data){
            $.ajax({
                type: "GET",
                dataType: "json",
                url: config.serverurl + this.props.data,
                success: (msg, status)=>{
                    this.setState({datainfo : msg});
                    this.setState({showinfo : true})
                }
            });
        }
    }
    // "accountSafeInfo": {
    //     "bindMobile": "180****2504",
    //     "identityVerified": "已完成",
    //     "loginEmail": "jwh****47655@163.com",
    //     "loginPasswdVerify": "已设置",
    //     "mobileVerified": "已绑定",
    //     "pwdProtectedQuestion": "未设置",
    //     "safeLevel": "中",
    //     "username": "jiaowenhui"
    // },

    // "personalInfo": {
    //     "aliPayRemainingAmount": "0.00",
    //     "aliPaymFund": "8920.81",
    //     "aliPaymFundProfit": "816.80",
    //     "buyerCreditPoint": 0,
    //     "creditLevel": "2000",
    //     "growthValue": "37246",
    //     "huabeiCanUseMoney": 7017,
    //     "huabeiTotalAmount": 8700,
    //     "taobaoFastRefundMoney": "2000",
    //     "taobaoLevel": "3",
    //     "tianMaoAccountName": "jiaowenhui",
    //     "tianMaoLevel": 2,
    //     "tianMaoPoints": 142,
    //     "tianmaoExperience": "",
    //     "tmProvilege": []
    // },
    render(){
        const { data,history } = this.props;
        

        if(this.state.showinfo){
            console.log(this.state.datainfo);
            const { accountSafeInfo,personalInfo } = this.props.datainfo;
            return (
                <div className="pageInfo">
                    <Cells>
                        <Cell>
                            <CellBody>
                                绑定的手机号
                            </CellBody>
                            <CellFooter>
                                {accountSafeInfo.bindMobile}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                身份认证
                            </CellBody>
                            <CellFooter>
                                {accountSafeInfo.identityVerified}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                邮箱
                            </CellBody>
                            <CellFooter>
                                {accountSafeInfo.loginEmail}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                用户名
                            </CellBody>
                            <CellFooter>
                                {accountSafeInfo.username}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                花呗剩余额度
                            </CellBody>
                            <CellFooter>
                                {personalInfo.huabeiCanUseMoney}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                花呗总额度
                            </CellBody>
                            <CellFooter>
                                {personalInfo.huabeiTotalAmount}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                淘宝等级
                            </CellBody>
                            <CellFooter>
                                {personalInfo.taobaoLevel}
                            </CellFooter>
                        </Cell>
                    </Cells>
                </div>
            )
        }else{
            return (
                <div className="nodata">
                    <span>Ta还没有通过该项认证</span>
                </div>
            )
        }
        
    }
}
TaobaoInfo = withRouter(TaobaoInfo);

class Page extends Component {

    constructor(props) {  
        super(props);  
        this.state = {
            status : 'taobao',
            datainfo : null,
            topicshow : true
        };
    }

    pushUrl = (name)=>{
        this.props.history.push(name);
    }

    SetStatus = (status)=>{
        this.setState({status: status});
    }

    hidetopic=()=>{
        this.setState({topicshow : false})
    }

    render() {
        const { navlist,resultid_obj,resulttaobao_detail,resultphone_detail } = this.props;
        return (
            <div className="borrowlistPage uservalidationinfoPage AppPage">
                <DocumentTitle title="借款人的认证信息" />
                <Tab>
                    <NavBar>
                        {
                            _.map(navlist, (list, index)=>{
                                return (
                                    <NavBarItem 
                                        active={this.state.status==list.type}
                                        onClick={()=>{this.SetStatus(list.type)}}
                                        key={index}
                                        >
                                        {list.name}
                                    </NavBarItem>
                                )
                            })
                        }
                    </NavBar>
                    <TabBody>
                        {this.state.status==="taobao"?(<TaobaoInfo data={resulttaobao_detail}/>):""}
                        {this.state.status==="phone"?(<PhoneInfo data={resultphone_detail}/>):""}
                    </TabBody>
                </Tab>
            </div>
        )
    }
}
const data = ({order}) => {
    let creator = order.orderInfo.creator;
    let navlist = [
        {
            name : "淘宝信息",
            type : "taobao"
        },
        {
            name : "运营商信息",
            type : "phone"
        }
    ];

    let resultphone_detail = creator.resultphone==2?creator.resultphone_detail:false;
    let resulttaobao_detail = creator.resulttaobao==2?creator.resulttaobao_detail:false;
    
    return {navlist,resultphone_detail,resulttaobao_detail};

};
Page = connect(data)(Page);
export default Page;





