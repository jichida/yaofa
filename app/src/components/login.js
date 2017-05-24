import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import '../../public/css/login.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Fields, Field, reduxForm, Form, formValueSelector } from 'redux-form';
import {
  loginwithtoken_request,
  loginwithweixinopenid_request,
  loginwithusername_request
} from '../actions';
import { required, InputValidation, phone, length4 } from "./tools/formvalidation"
export class LoginPage extends Component {
    componentWillMount() {
        let usertype = localStorage.getItem('usertype');
        let openid = "";
        let token = localStorage.getItem(`${usertype}_user_token`);
        if(token){
            this.props.dispatch(loginwithtoken_request({token}));
        }
    }
    pagePush=(name)=>{
        this.props.history.push(name);
    }
	render() {
        const { handleSubmit,onClickLogin,username,pristine,submitting } = this.props;
        return (
			<Form 
                className="loginForm formStyle1"
                onSubmit={handleSubmit(onClickLogin)}
                >
                <div className="li" >
                    <span className="icon">
                        <img src="img/16.png" />
                    </span>
                    <Field
                        name="username"
                        id="username"
                        placeholder="请输入您的账号"
                        type="text"
                        component={ InputValidation }
                        validate={[ required, phone ]}
                    />
                </div>
                <div className="li">
                    <span className="icon">
                        <img src="img/17.png" />
                    </span>
                    <Field
                        name="password"
                        id="password"
                        placeholder="请输入账号密码"
                        type="password"
                        component={ InputValidation }
                        validate={[ required ]}
                    />
                </div>
                <span 
                    className="getPassword"
                    onClick={()=>{this.pagePush("/resetpassword")}}
                    >
                    忘记密码?
                </span>
				<div className="submitBtn">
                    <span
                        className="btn login"
                        disabled={pristine || submitting}
                        onClick={handleSubmit(onClickLogin)}
                        >
                        登录
                    </span>
                    <span
                        className="btn register"
                        onClick={()=>{this.pagePush("/register")}}
                        >
                        注册
                    </span>
				</div>
			</Form>
    	)
    }
}

LoginPage = reduxForm({
    form: 'LoginPageForm'
})(LoginPage);

LoginPage = withRouter(LoginPage);

export class Page extends Component {
    componentWillMount() {
        if(this.props.usertype===''){
            this.props.history.replace("/usertype");
        };
    };
    //点击登陆
    onClickLogin =(value)=>{
        let usertype = this.props.usertype;
        let payload = {
            username: value.username,
            authcode: value.authcode,
            password: value.password,
        };
        console.log(value);
        this.props.dispatch(loginwithusername_request(payload));
    }
    render() {
        return (
            <div className="loginPage AppPage">
                <DocumentTitle title="登录" />
                <LoginPage onClickLogin={this.onClickLogin} />
            </div>
        )
    }
}

const data = ({userlogin:{usertype,loginsuccess}}) => {
    return {usertype,loginsuccess};
};

Page = connect(data)(Page);
export default Page;

