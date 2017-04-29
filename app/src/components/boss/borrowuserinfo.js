/*
    用户借款资料详情
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/borrowuserinfo.css';
const {
    CellBody,
    CellFooter,
    Cells,
    Cell
    } = WeUI;

class Page extends Component {

	render() {
        return (
    		<div className="borrowuserinfoPage AppPage">
    			<DocumentTitle title="借款人详情" />
                <div className="headcontent">
                    <div className="userinfo">
                        <img src="img/6.png" />
                        <span>爱喝水的宝宝</span>
                    </div>
                </div>
                <div className="form">
                    <Cells>
                        <Cell><CellBody>户籍</CellBody><CellFooter>江苏</CellFooter></Cell>
                        <Cell><CellBody>花呗额度</CellBody><CellFooter>10000元</CellFooter></Cell>
                        <Cell><CellBody>借呗额度</CellBody><CellFooter>20000元</CellFooter></Cell>
                        <Cell><CellBody>借贷宝负债</CellBody><CellFooter>2000元</CellFooter></Cell>
                        <Cell><CellBody>借贷宝已还款</CellBody><CellFooter>1000元</CellFooter></Cell>
                        <Cell><CellBody>手机号实名时间</CellBody><CellFooter>1年</CellFooter></Cell>
                    </Cells>
                    <Cells>
                        <Cell><CellBody>是否有固定资产</CellBody><CellFooter>有</CellFooter></Cell>
                        <Cell><CellBody>是否有工作单位</CellBody><CellFooter>无</CellFooter></Cell>
                        <Cell><CellBody>是否有公积金</CellBody><CellFooter>有</CellFooter></Cell>
                        <Cell><CellBody>是否有社保</CellBody><CellFooter>有</CellFooter></Cell>
                        <Cell><CellBody>三号是否统一</CellBody><CellFooter>有</CellFooter></Cell>
                        <Cell><CellBody>有无今日还款</CellBody><CellFooter>有</CellFooter></Cell>
                        <Cell><CellBody>有无身份证原件</CellBody><CellFooter>有</CellFooter></Cell>
                    </Cells>
                </div>
    		</div>
    	)
    }
}

export default Page;