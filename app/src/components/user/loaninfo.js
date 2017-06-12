/*
    放款详情
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/loaninfo.css';
import { connect } from 'react-redux';
import moment from "moment";
const { 
    Panel,
    PanelHeader,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    PanelBody,
    MediaBoxTitle,
    MediaBoxDescription,
    CellMore,
    PanelFooter,
    Cells,
    Cell,
    CellBody,
    CellFooter
    } = WeUI;
    
class Page extends Component {
	render() {
        const { orderInfo } = this.props;
        //console.log(orderInfo);
        return (
    		<div className="loaninfoPage AppPage">
    			<DocumentTitle title="放款详情" />
                <Panel>
                    <PanelBody>
                        <MediaBox type="appmsg">
                            <MediaBoxHeader>
                                <img src="img/6.png" />
                            </MediaBoxHeader>
                            <MediaBoxBody>
                                <div className="userinfo">
                                    <MediaBoxTitle>
                                        <span>借款人:</span>
                                        <span>爱喝水的宝宝</span>
                                    </MediaBoxTitle>
                                    <MediaBoxDescription>
                                        发布时间: 2017-09-09
                                    </MediaBoxDescription>
                                </div>
                                <div className="number">
                                    借款额度: <span className="blue">30,000</span>
                                </div>
                            </MediaBoxBody>
                        </MediaBox>
                    </PanelBody>
                </Panel>
                
                <Panel>
                    <PanelHeader>
                        放款信息
                    </PanelHeader>
                    <PanelBody>
                        <MediaBox type="text">
                            <MediaBoxDescription>
                                <div className="info">
                                    <div>放贷人:牛魔王</div>
                                    <div>放款时间: 2017-09-09</div>
                                    <div>放款额度: <span className="blue">10,000</span></div>
                                    <div>服务: <span className="green">1%</span></div>
                                    <div>押金比: <span className="green">1%</span></div>
                                </div>
                            </MediaBoxDescription>
                        </MediaBox>
                    </PanelBody>
                </Panel>

                <Cells>
                    <Cell access>
                        <CellBody>
                            查看放款人详情
                        </CellBody>
                        <CellFooter/>
                    </Cell>
                </Cells>

                <div className="submitBtn">
                    <botton className="btn Primary">同意接受</botton>
                </div>

                <div className="pageDesc">确认借款后，平台会讲你的详细资料发送给放款人，请等待放款人联系您，完成此次借款！</div>
    		</div>
    	)
    }
}

const data = ({order:{orderInfo}}) => {
    //console.log(orderInfo);
    //usertype: userborrow  useragency  userlender
    return {orderInfo};
};
Page = connect(data)(Page);
export default Page;


