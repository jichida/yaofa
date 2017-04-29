/*
    个人中心
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/usercenter.css';
const {
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter
    } = WeUI;

class Page extends Component {

	render() {
        return (
    		<div className="usercenterPage AppPage">
    			<DocumentTitle title="个人中心" />
                <div className="headcontent">
                    <img src="img/27.png" />
                    <div className="userinfo">
                        <img src="img/6.png" />
                        <span>爱喝水的宝宝</span>
                    </div>
                </div>
                <Cells>
                    <Cell href="javascript:;" access>
                        <CellHeader>
                            <img src="img/8.png" alt="" />
                        </CellHeader>
                        <CellBody>
                            我的放款
                        </CellBody>
                        <CellFooter/>
                    </Cell>
                    <Cell href="javascript:;" access>
                        <CellHeader>
                            <img src="img/9.png" alt="" />
                        </CellHeader>
                        <CellBody>
                            我的邀请码
                        </CellBody>
                        <CellFooter/>
                    </Cell>
                </Cells>
                <Cells>
                    <Cell href="javascript:;" access>
                        <CellHeader>
                            <img src="img/10.png" alt="" />
                        </CellHeader>
                        <CellBody>
                            设置
                        </CellBody>
                        <CellFooter/>
                    </Cell>
                </Cells>
            </div>
    	)
    }
}

export default Page;