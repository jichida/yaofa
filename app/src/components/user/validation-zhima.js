/*
    个人中心
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/validation-zhima.css';
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
            <div className="validationZhimaPage AppPage">
                <DocumentTitle title="芝麻认证" />
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>姓名</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="请输入您的真实姓名"/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>身份证号</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="请输入身份证号"/>
                        </CellBody>
                    </FormCell>
                </Form>
                <div className="btn Primary">
                    开始认证
                </div>
            </div>
        )
    }
}

export default Page;