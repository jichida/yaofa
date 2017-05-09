import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import '../../public/css/login.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Fields, Field, reduxForm, Form } from 'redux-form';
import {
  loginwithtoken_request,
  loginwithweixinopenid_request
} from '../actions';
import { required, InputValidation, phone, length4 } from "./tools/formvalidation"

export class LoginPage extends Component {

    componentWillMount() {
        let usertype = localStorage.getItem('usertype');
        let token = localStorage.getItem(`${usertype}_user_token`);
        if(token){
            this.props.dispatch(loginwithtoken_request({token}));
        }else{
            this.props.dispatch(loginwithweixinopenid_request({weixinopenid:'1111111114'}));
        }
        
    }

    pagePush=(name)=>{
        this.props.history.push(name);
    }

    login1=()=>{
        this.props.dispatch(
            loginwithweixinopenid_request({weixinopenid:'1111111111'}));
    }
    login2=()=>{
        this.props.dispatch(
            loginwithweixinopenid_request({weixinopenid:'1111111112'}));
    }

    //发送验证码
    sendcode=(value)=>{
        console.log(value);
        //let payload = {phonenumber:'15961125167'};
        //dispatch(sendauth_request(payload));
    }

	render() {
        const { handleSubmit,onClickLogin } = this.props;
        return (
			<Form 
                className="loginForm formStyle1"
                onSubmit={handleSubmit(onClickLogin)}
                style={{display:"none"}}
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
                <div className="li">
                    <span className="icon">
                        <img src="img/31.png" />
                    </span>
                    <Field
                        name="code"
                        id="code"
                        placeholder="请输入验证码"
                        type="text"
                        maxlength="4"
                        component={ InputValidation }
                        validate={[ required,length4 ]}
                    />
                    <span 
                        className="btn Primary getYanzhen"
                        onClick={this.sendcode}
                        >
                        获取验证码
                    </span>
                </div>

                <span 
                    className="getPassword"
                    onClick={()=>{this.pagePush("/resetpassword")}}
                    >
                    忘记密码?
                </span>
				<div className="submitBtn">
                    <button
                        className="btn login"
                        >
                        登录
                    </button>
                    <span
                        className="btn register"
                        onClick={()=>{this.pagePush("/register")}}
                        >
                        注册
                    </span>
				</div>

                <div
                    onClick={this.login1} 
                    >中介登录</div>
                <div
                    onClick={this.login2} 
                    >借款人登录</div>
			</Form>
    	)
    }
}

LoginPage = reduxForm({
    form: 'simple'
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
        if(usertype === 'userborrow'){
            payload.invitecode = '';
        }

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

