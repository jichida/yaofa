/*
    借款详情
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/borrowinfo.css';
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

class Page extends Component {

	render() {
        return (
    		<div className="borrowinfoPage AppPage">
    			<DocumentTitle title="借款详情" />
                <div className="headcontent">
                    <div>借 <span className="quota">3,000</span> 元</div>
                    <div>等待放款...</div>
                </div>
                <div className="userinfo">
                    <img src="img/6.png" />
                    <div>
                        <span><span>借款人:</span>爱喝水的宝宝</span>
                        <span><span>发布时间:</span>2017-07-07</span>
                    </div>
                </div>
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
                                            <span>放款 <span className="blue">10,000</span> 元</span>
                                            <span className="color_warning">待确认</span>
                                        </p>
                                    </CellFooter>
                                </Cell>
                            </Cells>
                        </MediaBox>
                    </PanelBody>
                </Panel>
    		</div>
    	)
    }
}

export default Page;