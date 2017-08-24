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
import withRouter from 'react-router-dom/withRouter';
import { requestUrlGet } from '../../util/util';
import config from '../../env/config';
import CopyToClipboard from 'react-copy-to-clipboard';
import ClipboardButton from 'react-clipboard.js';
import Clipboard from 'clipboard';

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
let newClipboard = null;

class PhoneInfo extends Component {
    constructor(props) {
        super(props);  
        this.state = {
            datainfo : {},
            showinfo : false,
            isSupported : false,
        };
    }
    componentWillMount () {
        this.getlist();
        newClipboard = null;
    }

    componentDidMount(){
        //copybtn
        newClipboard = new Clipboard('.copybtn');
        this.setState({isSupported : !!Clipboard.isSupported()});
        newClipboard.on('success', (e)=>{
            // alert(e.text);
            this.copyurl(e.text);
        });
    }
    getlist =()=>{
        if(this.props.data){
            window.$.ajax({
                type: "GET",
                dataType: "json", 
                url : config.serverurl + this.props.data,
                success: (msg, status)=>{
                    if(!!msg.phoneInfo){
                        this.setState({datainfo : msg});
                        this.setState({showinfo : true});
                    }
                }
            });
        }
    }

    ioscopyurl = (url)=>{
        this.props.dispatch(set_weui({ioscopy:{
            show : true,
            title : "选中并拷贝下面链接地址(IOS用户需要在电脑端打开链接进行文件下载)",
            text : url,
        }}))
        

        // if (document.selection) {
        //     console.log("console.log(document.selection)");
        //     console.log(document.selection)
        //     let range = document.body.createTextRange();
        //     range.moveToElementText(document.getElementById('ioscopyspan'));
        //     range.select();
        // } else if (window.getSelection) {
        //     console.log("console.log(window.getSelection)");
        //     console.log(window.getSelection);
        //     let range = document.createRange();
        //     console.log(range);
        //     range.selectNode(document.getElementById('ioscopyspan'));
        //     console.log(document.getElementById('ioscopyspan'));
        //     window.getSelection().addRange(range);
        // }
    }

    copyurl =(url)=>{
        console.log(url)
        this.props.dispatch(set_weui({alert:{
            show : true,
            title : "拷贝文件地址到其他浏览器端下载(IOS用户需要在电脑端打开链接进行下载)",
            text : url,
        }}))
    }

    render(){
        const { data,history,dataexcel,creator } = this.props;
        const timedata = (new Date()).getTime();
        
        if(this.state.showinfo){
            const { phoneInfo,phone_no,status,userInfo,callRecordsInfo,deceitRisk,messageRecordsInfo,contactAreaInfo,phoneOffInfos } = this.state.datainfo;

            let newcallRecordsInfo = _.sortBy(callRecordsInfo, [function(o) { return -o.connTimes; }]);

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
                    <CellsTitle>
                        <div className="CallRecordsInfoTitle">
                            <span>通话记录分析</span>
                            { !!dataexcel && 
                                <div>
                                {
                                    !this.state.isSupported && <span style={{color:"#3479e1", fontWeight: "bold"}} onClick={this.ioscopyurl.bind(this, `${config.serverurl}/getexcelfile/${creator._id}/${timedata}`)}>下载通话纪录</span>
                                }
                                {
                                    this.state.isSupported && <button className="copybtn" style={{color:"#3479e1", fontWeight: "bold", fontSize: "16px", background: "none", padding: 0, margin:0}} data-clipboard-text={`${config.serverurl}/getexcelfile/${creator._id}/${timedata}`}>
                                        下载通话纪录
                                    </button>
                                }
                                </div>
                            }
                        </div>
                    </CellsTitle>
                    <div className="loanshowborrowinfotable">
                        <table>
                            <tr>
                                <th>号码(地区)</th>
                                <th>通话次数</th>
                                <th>被叫次</th>
                                <th>主叫次</th>
                            </tr>
                            {
                                _.map(newcallRecordsInfo, (info,index)=>{
                                    return (
                                        <tr key={index}>
                                            <td>{info.phoneNo}<br/>{info.belongArea}</td>
                                            <td>{info.connTimes}</td>
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
PhoneInfo = connect()(PhoneInfo);


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
            
            window.$.ajax({
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
            //console.log(this.state.datainfo);
            const { accountSafeInfo,personalInfo,addrs,orderList } = this.state.datainfo;
            const newOrderList = _.slice(orderList, 0, 20);
            //console.log("newOrderList");
            //console.log(newOrderList);
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
                    <CellsTitle>最近20条订单信息</CellsTitle>
                    <Cells>
                        {
                            _.map(newOrderList, (order, index)=>{
                                return (
                                    <Cell key={index}>
                                        <CellBody>
                                            {order.businessDate},
                                            {order.orderProducts[0].productName},
                                            {order.orderTotalPrice},
                                            {order.orderStatus}
                                        </CellBody>
                                    </Cell>
                                )
                            })
                        }
                        
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
        const { data,resultzhima } = this.props;
        const greenhave = (<span className="green">有</span>);
        return (
            <div className="baseinfo">
                <Cells>
                    <Cell><CellBody>芝麻信用分</CellBody><CellFooter>{resultzhima?resultzhima:"未认证"}</CellFooter></Cell>
                </Cells>
                <Cells>
                
                    <Cell><CellBody>户籍</CellBody><CellFooter>{data.hasOwnProperty("hukou")?`${data.hukou}`:"未填写"}</CellFooter></Cell>
                    <Cell><CellBody>花呗额度</CellBody><CellFooter>{data.hasOwnProperty("limithuabei")?`${data.limithuabei}元`:"未填写"}</CellFooter></Cell>
                    <Cell><CellBody>借呗额度</CellBody><CellFooter>{data.hasOwnProperty("limitjiebei")?`${data.limitjiebei}元`:"未填写"}</CellFooter></Cell>
                    <Cell><CellBody>借贷宝负债</CellBody><CellFooter>{data.hasOwnProperty("jiedaibaofuzai")?`${data.jiedaibaofuzai}元`:"未填写"}</CellFooter></Cell>
                    <Cell><CellBody>借贷宝已还款</CellBody><CellFooter>{data.hasOwnProperty("jiedaobaoyihuan")?`${data.jiedaobaoyihuan}元`:"未填写"}</CellFooter></Cell>
                    <Cell><CellBody>手机号实名时间</CellBody><CellFooter>{data.hasOwnProperty("realtimeforphoneyear")?`${data.realtimeforphoneyear}年`:"未填写"}</CellFooter></Cell>

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
            let info = data.data;
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
                    <span>Ta还没有通过该项认证</span>
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
        const { navlist,resultid_obj,resulttaobao_detail,resultphone_detail,resultphone_detail_excel,borrow_baseinfo,resultzhima_obj } = this.props;
        return (
            <div className="borrowlistPage uservalidationinfoPage AppPage">
                <DocumentTitle title="借款人的认证信息" />
                <Tab style={{minHeight : window.innerHeight +"px"}}>
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
                        {this.state.status==="shengfen"?(<IdInfo data={resultid_obj}/>):""}
                        {this.state.status==="taobao"?(<TaobaoInfo data={resulttaobao_detail}/>):""}
                        {this.state.status==="phone"?(<PhoneInfo data={resultphone_detail} dataexcel={resultphone_detail_excel} creator={borrow_baseinfo}  />):""}
                        {this.state.status==="base"?(<BaseInfo data={borrow_baseinfo} resultzhima={resultzhima_obj}/>):""}
                    </TabBody>
                </Tab>
            </div>
        )
    }
}
const data = ({order:{borrow_baseinfo},order}) => {
    let creator = order.orderInfo.creator;
    let navlist = [
        {name : "淘宝信息",type : "taobao"},
        {name : "运营商信息",type : "phone"},
        {name : "身份信息",type : "shengfen"},
        {name : "其他借款信息",type : "base"}
    ];
    let resultid_obj = creator.resultid==2?JSON.parse(creator.resultid_obj):false;
    let resultphone_detail = creator.resultphone==2?creator.resultphone_detail:false;
    let resultphone_detail_excel = !!creator.resultphone_detail_excel?creator.resultphone_detail_excel:false;
    let resulttaobao_detail = creator.resulttaobao==2?creator.resulttaobao_detail:false;
    let resultzhima_obj = creator.resultzhima==2?creator.resultzhima_obj:false;
    return {navlist,resultid_obj,resulttaobao_detail,resultphone_detail,borrow_baseinfo:creator, resultzhima_obj, resultphone_detail_excel};
};
Page = connect(data)(Page);
export default Page;





