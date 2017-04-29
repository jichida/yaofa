import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import '../../public/css/resetpassword.css';

class Page extends Component {

	render() {
        return (
    		<div className="resetpasswordPage AppPage">
    			<DocumentTitle title="忘记密码" />
    			<div className="resetpasswordForm">
    				<div className="li">
    					<input placeholder='请输入手机号' type="text" name="username" />
    				</div>
                    <div className="li">
                        <input placeholder='请输入验证码' type="password" name="password" />
                        <span className="btn Primary getYanzhen">获取验证码</span>
                    </div>
    				<div className="li">
    					<input placeholder='请输入新的密码' type="password" name="password" />
    				</div>
                    <div className="li">
                        <input placeholder='再次输入密码' type="password" name="password2" />
                    </div>
    				<div className="submitBtn">
    					<botton className="btn login">确定</botton>
    				</div>
    			</div>
    		</div>
    	)
    }
}

export default Page;