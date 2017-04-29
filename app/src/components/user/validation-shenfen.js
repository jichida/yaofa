/*
    身份认证
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/validation-shenfen.css';
import _ from 'lodash';

const {
    Icon,
    Form,
    FormCell,
    CellHeader,
    Label,
    CellBody,
    Input
    } = WeUI;

class Page extends Component {

	render() {

        return (
    		<div className="validationShenfenPage AppPage">
    			<DocumentTitle title="身份信息" />
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>姓名</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="请输入身份证中的名称"/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>身份证</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="请输入身份证号"/>
                        </CellBody>
                    </FormCell>
                </Form>
                <div className="btn Primary">
                    确认 ｜ 下一步
                </div>
            </div>
    	)
    }
}

export default Page;