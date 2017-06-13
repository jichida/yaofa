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
    Cell,
    Cells,
    TabBody,
    CellBody,
    CellFooter,
    } = WeUI;

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


class Page extends Component {

    render() {
        const { navlist,resultid_obj,resulttaobao_detail,resultphone_detail,borrow_baseinfo } = this.props;
        return (
            <div className="borrowlistPage uservalidationinfoPage AppPage">
                <DocumentTitle title="基本借款信息" />
                <Tab>
                    <TabBody>
                        <BaseInfo data={borrow_baseinfo}/>
                    </TabBody>
                </Tab>
            </div>
        )
    }
}
const data = ({order:{borrow_baseinfo},order}) => {
    let creator = order.orderInfo.creator;
    return {borrow_baseinfo:creator};
};
Page = connect(data)(Page);
export default Page;





