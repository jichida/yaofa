/*
    个人中心
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/validation-phone.css';
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
            <div className="validationPhonePage AppPage">
                <DocumentTitle title="身份信息" />
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>手机号码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="请输入您的手机号"/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>服务密码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="请输入服务密码"/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>验证码</Label>
                        </CellHeader>
                        <CellBody className="yanzhen">
                            <Input type="tel" placeholder="请输入验证码"/>
                            <span className="btn Primary yanzhenbtn">获取</span>
                        </CellBody>
                    </FormCell>
                </Form>
                <div className="btn Primary">
                    授权
                </div>
                <div className="warningBox">
                    <div className="tit">
                        <img src="img/25.png" />
                        <span>温馨提示:</span>
                    </div>
                    <div className="text">
                        <p>1、请授权本人实名认证手机号</p>
                        <p>2、登录成功之后会收到运营商短信，无需理会</p>
                        <p>3、可授权多个手机号</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Page;