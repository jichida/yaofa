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
    CellsTitle
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
        
        if(this.state.showinfo){
            const { phoneInfo,phone_no,status,userInfo,callRecordsInfo,deceitRisk,messageRecordsInfo,contactAreaInfo,phoneOffInfos } = this.state.datainfo;
            return (
                <div className="pageInfo loanshowborrowinfoPageinfo">
                    <CellsTitle>运营商信息</CellsTitle>
                    <Cells>
                        <Cell><CellBody>运营商类型</CellBody><CellFooter>{phoneInfo.operator}</CellFooter></Cell>
                        <Cell><CellBody>入网时间</CellBody><CellFooter>{phoneInfo.inNetDate}</CellFooter></Cell>
                        <Cell><CellBody>认证实名</CellBody><CellFooter>{phoneInfo.realName}</CellFooter></Cell>
                        <Cell><CellBody>认证身份证号</CellBody><CellFooter>{phoneInfo.certNo}</CellFooter></Cell>
                        <Cell><CellBody>手机号</CellBody><CellFooter>{phoneInfo.phoneNo}</CellFooter></Cell>
                        <Cell><CellBody>当前余额</CellBody><CellFooter>{phoneInfo.balance}</CellFooter></Cell>
                        <Cell><CellBody>会员等级</CellBody><CellFooter>{phoneInfo.vipLevel}</CellFooter></Cell>
                        <Cell><CellBody>积分值</CellBody><CellFooter>{phoneInfo.pointValue}</CellFooter></Cell>
                        <Cell><CellBody>网龄</CellBody><CellFooter>{phoneInfo.netAge}</CellFooter></Cell>
                        <Cell><CellBody>最早通话时间</CellBody><CellFooter>{phoneInfo.firstCallDate}</CellFooter></Cell>
                        <Cell><CellBody>最近通话时间</CellBody><CellFooter>{phoneInfo.lastCallDate}</CellFooter></Cell>
                        <Cell><CellBody>登记地址</CellBody><CellFooter>{phoneInfo.addr}</CellFooter></Cell>
                    </Cells>
                    <CellsTitle>欺诈风险</CellsTitle>
                    <Cells>
                        <Cell><CellBody>运营商是否实名</CellBody><CellFooter>{deceitRisk.phoneIsAuth==="True"?"是":"否"}</CellFooter></Cell>
                        <Cell><CellBody>是否出现长时间关机(5 天以上无短信记录,无通 话记录)</CellBody><CellFooter>{deceitRisk.longTimePowerOff==="True"?"是":"否"}</CellFooter></Cell>
                        <Cell><CellBody>是否联系过紧急联系人</CellBody><CellFooter>{deceitRisk.emergency_contacted==="True"?"是":"否"}</CellFooter></Cell>
                        <Cell><CellBody>申请人信息是否命中网 贷黑名单</CellBody><CellFooter>{deceitRisk.inBlacklist==="True"?"是":"否"}</CellFooter></Cell>
                        <Cell><CellBody>是否出现法院相关号码 呼叫</CellBody><CellFooter>{deceitRisk.calledByCourtNo==="True"?"是":"否"}</CellFooter></Cell>
                        <Cell><CellBody>运营商是否实名</CellBody><CellFooter>{deceitRisk.phoneIsAuth==="True"?"是":"否"}</CellFooter></Cell>
                    </Cells>
                    <CellsTitle>通话记录分析</CellsTitle>
                    <div className="loanshowborrowinfotable">
                        <table>
                            <tr>
                                <th>号码(地区)</th>
                                <th>通话时长</th>
                                <th>被叫次</th>
                                <th>主叫次</th>
                            </tr>
                            {
                                _.map(callRecordsInfo, (info,index)=>{
                                    return (
                                        <tr key={index}>
                                            <td>{info.phoneNo}<br/>{info.belongArea}</td>
                                            <td>{info.connTime}</td>
                                            <td>{info.calledTimes}</td>
                                            <td>{info.callTimes}</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                    
                    <CellsTitle>联系人位置分析</CellsTitle>
                    <div className="loanshowborrowinfotable">
                        <table>
                            <tr>
                                <th>地区(数量)</th>
                                <th>主叫次/时间</th>
                                <th>被叫次/时间</th>
                                <th>占比</th>
                            </tr>
                            {
                                _.map(contactAreaInfo, (info,index)=>{
                                    return (
                                        <tr key={index}>
                                            <td>{info.area}({info.totalNumber})</td>
                                            <td>{info.callTimes}次/{info.callTime}分钟</td>
                                            <td>{info.calledTimes}次/{info.calledTime}分钟</td>
                                            <td>{info.percent}</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
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
    render(){
        const { data,history } = this.props;
        if(this.state.showinfo){
            console.log(this.state.datainfo);
            const { accountSafeInfo,personalInfo,addrs } = this.state.datainfo;
            return (
                <div className="pageInfo loanshowborrowinfoPageinfo">
                    <CellsTitle>淘宝基础信息</CellsTitle>
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
                    </Cells>
                    <CellsTitle>淘宝信用数据</CellsTitle>
                    <Cells>
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
                        <Cell>
                            <CellBody>
                                天猫等级
                            </CellBody>
                            <CellFooter>
                                {personalInfo.tianMaoLevel}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                信用分
                            </CellBody>
                            <CellFooter>
                                {personalInfo.creditLevel}
                            </CellFooter>
                        </Cell>
                    </Cells>
                    <CellsTitle>收获地址信息</CellsTitle>
                    <Cells>
                        {
                            _.map(addrs, (adds, index)=>{
                                return (
                                    <Cell key={index}>
                                        <CellBody>
                                            {adds}
                                        </CellBody>
                                    </Cell>
                                )
                            })
                        }
                        
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

class BaseInfo extends Component{

    render(){
        const { data } = this.props;
        const greenhave = (<span className="green">有</span>);
        return (
            <div className="baseinfo">
                <Cells>
                    <Cell><CellBody>户籍</CellBody><CellFooter>{data.hukou?`${data.hukou}`:"未填写"}</CellFooter></Cell>
                    <Cell><CellBody>花呗额度</CellBody><CellFooter>{data.limithuabei?`${data.limithuabei}元`:"未填写"}</CellFooter></Cell>
                    <Cell><CellBody>借呗额度</CellBody><CellFooter>{data.limitjiebei?`${data.limitjiebei}元`:"未填写"}</CellFooter></Cell>
                    <Cell><CellBody>借贷宝负债</CellBody><CellFooter>{data.jiedaibaofuzai?`${data.jiedaibaofuzai}元`:"未填写"}</CellFooter></Cell>
                    <Cell><CellBody>借贷宝已还款</CellBody><CellFooter>{data.jiedaobaoyihuan?`${data.jiedaobaoyihuan}元`:"未填写"}</CellFooter></Cell>
                    <Cell><CellBody>手机号实名时间</CellBody><CellFooter>{data.realtimeforphoneyear?`${data.realtimeforphoneyear}年`:"未填写"}</CellFooter></Cell>
                </Cells>
                <Cells>
                    <Cell><CellBody>是否有固定资产</CellBody><CellFooter>{data.hasgudingzichan?greenhave:"无"}</CellFooter></Cell>
                    <Cell><CellBody>是否有工作单位</CellBody><CellFooter>{data.hasdanwei?greenhave:"无"}</CellFooter></Cell>
                    <Cell><CellBody>是否有公积金</CellBody><CellFooter>{data.hasgongjijin?greenhave:"无"}</CellFooter></Cell>
                    <Cell><CellBody>是否有社保</CellBody><CellFooter>{data.hasshebao?greenhave:"无"}</CellFooter></Cell>
                    <Cell><CellBody>三号是否统一</CellBody><CellFooter>{data.hassanhaotongyi?greenhave:"无"}</CellFooter></Cell>
                    <Cell><CellBody>有无今日还款</CellBody><CellFooter>{data.hasjinrihuankuan?greenhave:"无"}</CellFooter></Cell>
                    <Cell><CellBody>有无身份证原件</CellBody><CellFooter>{data.hasshenfenzhengyuanjian?greenhave:"无"}</CellFooter></Cell>
                </Cells>
            </div>
        )
    }
}
BaseInfo = withRouter(BaseInfo);

class IdInfo extends Component {
    render(){
        const { data,history } = this.props;
        if(data){
            let datainfo = JSON.parse(data);
            let info = datainfo.data;
            return (
                <div className="pageInfo">
                    <Cells>
                        <Cell>
                            <CellBody>
                                姓名
                            </CellBody>
                            <CellFooter>
                                {info.name}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                身份证号
                            </CellBody>
                            <CellFooter>
                                {info.cardno}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                性别
                            </CellBody>
                            <CellFooter>
                                {info.sex==="M"?"男":"女"}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                出生日期
                            </CellBody>
                            <CellFooter>
                                {info.birthday}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                地址
                            </CellBody>
                            <CellFooter>
                                {info.address}
                            </CellFooter>
                        </Cell>
                    </Cells>
                </div>
            )
        }else{
            return (
                <div className="nodata">
                    <span>您还没有通过该项认证</span>
                    <span className="btn Primary" onClick={()=>{history.push("/validation")}}>去认证</span>
                </div>
            )
        }
    }
}
IdInfo = withRouter(IdInfo);

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
        const { navlist,resultid_obj,resulttaobao_detail,resultphone_detail,borrow_baseinfo } = this.props;
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
                        {this.state.status==="id"?(<IdInfo data={resultid_obj}/>):""}
                        {this.state.status==="taobao"?(<TaobaoInfo data={resulttaobao_detail}/>):""}
                        {this.state.status==="phone"?(<PhoneInfo data={resultphone_detail}/>):""}
                        {this.state.status==="base"?(<BaseInfo data={borrow_baseinfo}/>):""}
                    </TabBody>
                </Tab>
            </div>
        )
    }
}
const data = ({order:{borrow_baseinfo},order}) => {
    let creator = order.orderInfo.creator;
    let navlist = [
        {
            name : "淘宝信息",
            type : "taobao"
        },
        {
            name : "运营商信息",
            type : "phone"
        },
        {
            name : "身份信息",
            type : "shengfen"
        },
        {
            name : "其他借款信息",
            type : "base"
        }
    ];
    let resultid_obj = creator.resultid==2?JSON.parse(creator.resultid_obj):false;
    let resultphone_detail = creator.resultphone==2?creator.resultphone_detail:false;
    let resulttaobao_detail = creator.resulttaobao==2?creator.resulttaobao_detail:false;
    console.log("~~~~~~~~~~~~~~~");
    console.log(resultid_obj);
    console.log(resultphone_detail);
    console.log(resulttaobao_detail);
    
    return {navlist,resultid_obj,resulttaobao_detail,resultphone_detail,borrow_baseinfo:creator};

};
Page = connect(data)(Page);
export default Page;





