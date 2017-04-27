/*
    借款信息
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/addborrow.css';
const { 
    FormCell,
    Checkbox,
    Form,
    Select,


    Panel,
    PanelBody,
    MediaBox,
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Input,
    Label
    } = WeUI;

class Page extends Component {

	render() {
        return (
    		<div className="addborrowPage AppPage">
    			<DocumentTitle title="借款详情" />
                <Form className="formStyle1">
                    <FormCell>
                        <CellHeader>
                            <Label><img src="img/13.png" /> <span>借款额度</span></Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="Enter your qq#"/>
                            <span>元</span>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label><img src="img/32.png" /> <span>借款周期</span></Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="Enter your qq#"/>
                            <span>天</span>
                        </CellBody>
                    </FormCell>
                    <FormCell select selectPos="after">
                        <CellHeader>
                            <Label><img src="img/15.png" /> <span>借款用途</span></Label>
                        </CellHeader>
                        <CellBody>
                            <Select data={[
                                {
                                    value: 1,
                                    label: '临时周转'
                                },
                                {
                                    value: 2,
                                    label: '买房'
                                },
                                {
                                    value: 3,
                                    label: '买车'
                                }
                            ]} />
                        </CellBody>
                    </FormCell>
                </Form>
                <div className="submitBtn">
                    <botton className="btn Primary">确定</botton>
                </div>
    		</div>
    	)
    }
}

export default Page;