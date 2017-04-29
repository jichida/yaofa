/*
    放款
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
    			<DocumentTitle title="放款" />
                <Form className="formStyle1">
                    <FormCell>
                        <CellHeader>
                            <Label><img src="img/13.png" /> <span>额度</span></Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="请输入您的放款额度"/>
                            <span>元</span>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label><img src="img/14.png" /> <span>服务费</span></Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="请输入服务费"/>
                            <span>％</span>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label><img src="img/15.png" /> <span>押金比</span></Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="请输入押金比"/>
                            <span>％</span>
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