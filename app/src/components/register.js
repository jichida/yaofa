import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../public/css/register.css';
const { 
    FormCell,
    Checkbox,
    CellHeader,
    CellBody,
    Form,
    Agreement
    } = WeUI;

class Page extends Component {

	render() {
        return (
    		<div className="registerPage AppPage">
    			<DocumentTitle title="注册" />
    			<div className="registerForm formStyle1">
    				<div className="li">
    					<input placeholder='请输入手机号' type="text" name="username" />
    				</div>
                    <div className="li">
                        <input placeholder='请输入验证码' type="password" name="password" />
                        <span className="btn Primary getYanzhen">获取验证码</span>
                    </div>
    				<div className="li">
    					<input placeholder='请输入账号密码' type="password" name="password" />
    				</div>
                    <div className="li">
                        <input placeholder='再次输入账号密码' type="password" name="password2" />
                    </div>
                    <div className="li yaoqing">
                        <input placeholder='如果您有邀请码,请输入' type="text" name="yaoqing" />
                    </div>
                    <div className="agreeCheckbox">
                        <Form checkbox>
                            <FormCell checkbox>
                                <CellHeader>
                                    <Checkbox name="checkbox1" value="1"/>
                                </CellHeader>
                                <CellBody>同意运营条款</CellBody>
                            </FormCell>
                        </Form>
                    </div>
                    <Agreement>
                        &nbsp;&nbsp;<a href="#">同意运营条款</a>
                    </Agreement>
    				<div className="submitBtn">
    					<botton className="btn login">登录</botton>
                        <botton className="btn register">注册</botton>
    				</div>
    			</div>
    		</div>
    	)
    }
}

export default Page;