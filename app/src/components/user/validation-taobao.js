/*
    淘宝认证
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/validation-taobao.css';
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
            <div className="validationTaobaoPage AppPage">
                <DocumentTitle title="身份信息" />
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>淘宝账号</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="请输入您的淘宝账号"/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>密码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="请输入淘宝账号密码"/>
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