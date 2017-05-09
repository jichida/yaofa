import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../public/css/register.css';

import { 
    Fields, 
    Field, 
    reduxForm, 
    Form,
    formValueSelector
    } from 'redux-form';
import { 
    required, 
    InputValidation, 
    phone, 
    length4, 
    passwordA,
    passwordB,
    } from "./tools/formvalidation"

import {
    sendauth_request,
    register_request,
    loginwithweixinopenid_request
    } from '../actions';

export class RegisterPage extends Component {

    pageReplace=(name)=>{
        this.props.history.replace(name);
    }

    login1=()=>{
        this.props.dispatch(
            loginwithweixinopenid_request({weixinopenid:'1111111111'}));
    }

	render() {
        const usertype = localStorage.getItem('usertype');
        const { handleSubmit,onClickRegister,sendCode,hasAggree,username } = this.props;
        return (
            <Form 
                className="registerForm"
                onSubmit={handleSubmit(onClickRegister)}
                >
				<div className="li">
                    <Field
                        name="username"
                        id="username"
                        placeholder="请输入手机号"
                        type="text"
                        component={ InputValidation }
                        validate={[ required, phone ]}
                    />
				</div>

                <div className="li">
                    <Field
                        name="authcode"
                        id="authcode"
                        placeholder="请输入验证码"
                        type="text"
                        maxlength="4"
                        component={ InputValidation }
                        validate={[ required,length4 ]}
                    />
                    <span 
                        type="button"
                        className="btn Primary getYanzhen"
                        onClick={()=>{sendCode(username)}}
                        >
                        获取验证码
                    </span>
                </div>

                <div className="li">
                    <Field
                        name="password"
                        id="password"
                        placeholder="请输入账号密码"
                        type="password"
                        component={ InputValidation }
                        validate={[ required, passwordA ]}
                    />
                </div>

                <div className="li">
                    <Field
                        name="password2"
                        id="password2"
                        placeholder="再次输入账号密码"
                        type="password"
                        component={ InputValidation }
                        validate={[ required, passwordB ]}
                    />
                </div>

                {usertype==="userborrow"?(
                    <div className="li" data="29958019">
                        <Field
                            name="invitecode"
                            id="invitecode"
                            placeholder="请输入邀请码"
                            type="text"
                            component={ InputValidation }
                        />
                    </div>
                ):''}

                <div className="aggreeForm">
                    <Field 
                        name="hasAggree" 
                        id="hasAggree" 
                        component="input" 
                        type="checkbox"
                        />
                    <label htmlFor="hasAggree">同意<a href="#">运营条款</a></label>
                </div>

				<div className="submitBtn">
                    {hasAggree?(
                        <button 
                            className="btn login"
                            >
                            注册
                        </button>
                    ):(
                        <button 
                            className="btn login"
                            disabled
                            >
                            注册
                        </button>
                    )}
                    <span 
                        className="btn register"
                        onClick={()=>{this.pageReplace("/login")}}
                        >
                        登录
                    </span>
				</div>

                <div
                    onClick={this.login1} 
                    >中介登录</div>

			</Form>
    	)
    }
}

RegisterPage = reduxForm({
    form: 'selectingFormValues'
})(RegisterPage);

const selector = formValueSelector('selectingFormValues') 
RegisterPage = connect(
    state => {
        const hasAggree = selector(state, 'hasAggree');
        const username = selector(state, 'username');
        return {
            hasAggree,
            username
        }
    }
)(RegisterPage)

RegisterPage = withRouter(RegisterPage);

export class Page extends Component {
    componentWillMount() {
        if(this.props.usertype===''){
            this.props.history.replace("/usertype");
        };
    }
    //发送验证码
    sendCode =(value)=>{
        let payload = {phonenumber:value};
        this.props.dispatch(sendauth_request(payload));
    }
    //点击注册
    onClickRegister =(value)=>{
        let usertype = this.props.usertype;
        let payload = {
            username: value.username,
            authcode: value.authcode,
            password: value.password,
            weixinopenid: "1111111112",//微信openid
        };
        if(usertype === 'userborrow'){
            payload.invitecode = value.invitecode;
        }
        this.props.dispatch(register_request(payload));
    }
    render() {
        return (
            <div className="registerPage AppPage">
                <DocumentTitle title="注册" />
                <RegisterPage 
                    onClickRegister={this.onClickRegister}
                    sendCode = {this.sendCode}
                />
            </div>
        )
    }
}

const data = ({userlogin:{usertype}}) => {
    return {usertype};
};

Page = connect(data)(Page);
export default Page;
