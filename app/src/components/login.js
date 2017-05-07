import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../public/css/login.css';
import { connect } from 'react-redux';
import { Fields, Field, reduxForm, Form } from 'redux-form';

export class LoginPage extends Component {

	render() {
        const { handleSubmit } = this.props;
        return (
    		
    			<Form 
                    className="loginForm formStyle1"
                    onSubmit={handleSubmit}
                    >

                    <div className="li">
                        <span className="icon">
                            <img src="img/16.png" />
                        </span>
                        <Field
                            name="username"
                            id="username"
                            component="input"
                            type="text"
                            placeholder="请输入您的账号"
                        />
                    </div>
                    <div className="li">
                        <span className="icon">
                            <img src="img/17.png" />
                        </span>
                        <Field
                            name="password"
                            id="password"
                            component="input"
                            type="password"
                            placeholder="请输入账号密码"
                        />
                    </div>
                    <div className="li">
                        <span className="icon">
                            <img src="img/31.png" />
                        </span>
                        <Field
                            name="code"
                            id="code"
                            component="input"
                            type="text"
                            placeholder="请输入验证码"
                        />
                        <span className="btn Primary getYanzhen">获取验证码</span>
                    </div>

                    <span className="getPassword">
                        忘记密码?
                    </span>
    				<div className="submitBtn">
                        <button
                            className="btn login"
                            >
                            登录
                        </button>
                        <button
                            className="btn register"
                            onClick={()=>{this.props.history.push("/register")}}
                            >
                            注册
                        </button>
    				</div>
    			</Form>
    		
    	)
    }
}

const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = '必须填写用户名';
    }
    else {
        let phone = values.username;
        phone = phone.replace(/\s/g, '');
        if (phone.match(/\D/g) || phone.length !== 11 || !phone.match(/^1/)) {
            errors.username = '无效的手机号码';
        }
    }
    if (!values.password) {
        errors.password = '必须填写密码'
    }
    else {
        let psd = values.password;
        if (psd.match(/\s/g)) {
            errors.password = '密码不能含有空格';
        }
        else if (psd.length < 6 || psd.length > 16) {
            errors.password = '密码应大于六位小于16位';
        }
    }
    return errors;
}

LoginPage = reduxForm({
    form: 'simple',
    validate
})(LoginPage);



export class Page extends Component {
    componentWillMount() {
        if(this.props.usertype===''){
            this.props.history.replace("/usertype");
        };
    };
    //点击登陆
    onClickLogin =(values)=>{
        console.log(values);
    }
    render() {
        return (
            <div className="loginPage AppPage">
                <DocumentTitle title="登录" />
                <LoginPage onSubmit={this.onClickLogin} />
            </div>
        )
    }
}

const data = ({userlogin:{usertype}}) => {
    return {usertype};
};

Page = connect(data)(Page);
export default Page;

