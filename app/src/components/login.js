import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../public/css/login.css';
const { Icon } = WeUI;

class Page extends Component {

	render() {
        return (
    		<div className="loginPage AppPage">
    			<DocumentTitle title="登录" />
    			<div className="loginForm formStyle1">
    				<div className="li">
                        <span className="icon">
                            <img src="img/16.png" />
                        </span>
    					<input placeholder='请输入手机号' type="text" name="username" />
    				</div>
    				<div className="li">
                        <span className="icon">
                            <img src="img/17.png" />
                        </span>
    					<input placeholder='请输入账号密码' type="password" name="password" />
    				</div>
                    <div className="li">
                        <span className="icon">
                            <img src="img/31.png" />
                        </span>
                        <input placeholder='请输入验证码' type="password" name="password" />
                        <span className="btn Primary getYanzhen">获取验证码</span>
                    </div>
                    <span className="getPassword">
                        忘记密码?
                    </span>
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