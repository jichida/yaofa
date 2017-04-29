/*
    放款详情
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/settings.css';
const { 
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellHeader
    } = WeUI;

class Page extends Component {

	render() {
        return (
    		<div className="settingsPage AppPage">
    			<DocumentTitle title="放款详情" />
                <Cells>
                    <Cell href="javascript:;" access>
                        <CellHeader>
                            <img src="img/19.png" alt="" style={{display: `block`, width: `30px`, marginRight: `5px`}}/>
                        </CellHeader>
                        <CellBody>
                            帮助与反馈
                        </CellBody>
                        <CellFooter />
                    </Cell>
                </Cells>

                <div className="submitBtn">
                    <botton className="btn Primary">退出登录</botton>
                </div>
    		</div>
    	)
    }
}

export default Page;