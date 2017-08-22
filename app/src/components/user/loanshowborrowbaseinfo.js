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
import { 
    getmyorders_request,
    set_myorderlistStatus,
    set_orderinfo,
    set_weui
    }  from "../../actions";

const {
    Tab,
    Cell,
    Cells,
    TabBody,
    CellBody,
    CellFooter,
    } = WeUI;

class BaseInfo extends Component{

    constructor(props) {
        super(props);  
        this.state = {
            showinfo : false,
            contact1num : 0,
            contact2num : 0
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
                url : config.serverurl + this.props.data.resultphone_detail,
                success: (msg, status)=>{
                    if(!!msg.phoneInfo){
                        this.setState({datainfo : msg});
                        this.setState({showinfo : true});

                        if(!!this.props.data.contact1 && !!msg.callRecordsInfo){
                            let s1 = _.filter(msg.callRecordsInfo, (o)=> { return o.phoneNo===this.props.data.contact1.phonenumber; });
                            if(s1.length>0){
                                this.setState({contact1num : s1[0].connTimes});
                            }
                        }
                        if(!!this.props.data.contact2 && !!msg.callRecordsInfo){
                            let s2 = _.filter(msg.callRecordsInfo, (o)=> { return o.phoneNo===this.props.data.contact2.phonenumber; });
                            if(s2.length>0){
                                this.setState({contact2num : s2[0].connTimes});
                            }
                        }
                    }
                }
            });
        }
    }

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
                <Cells>
                    <Cell><CellBody>常用联系人1</CellBody><CellFooter>{data.contact1?`${data.contact1.name} ${data.contact1.phonenumber.substr(0,3)}****${data.contact1.phonenumber.substr(7,4)} ${this.state.contact1num}次` :"未填写"}</CellFooter></Cell>
                    <Cell><CellBody>常用联系人2</CellBody><CellFooter>{data.contact2?`${data.contact2.name} ${data.contact2.phonenumber.substr(0,3)}****${data.contact2.phonenumber.substr(7,4)} ${this.state.contact2num}次` :"未填写"}</CellFooter></Cell>
                </Cells>
            </div>
        )
    }
}
BaseInfo = withRouter(BaseInfo);


class Page extends Component {

    render() {
        const { navlist,resultid_obj,resulttaobao_detail,resultphone_detail,borrow_baseinfo,resultzhima_obj } = this.props;
        return (
            <div className="borrowlistPage uservalidationinfoPage AppPage">
                <DocumentTitle title="基本借款信息" />
                <Tab>
                    <TabBody>
                        <BaseInfo data={borrow_baseinfo} resultzhima={resultzhima_obj}/>
                    </TabBody>
                </Tab>
            </div>
        )
    }
}
const data = ({order:{borrow_baseinfo},order}) => {
    let creator = order.orderInfo.creator;
    let resultzhima_obj = creator.resultzhima==2?creator.resultzhima_obj:false;
    return {borrow_baseinfo:creator, resultzhima_obj};
};
Page = connect(data)(Page);
export default Page;





