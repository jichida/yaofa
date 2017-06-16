import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../public/css/register.css';

import {
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
    length6,
    passwordA,
    passwordB,
    ischecked,
    WeuiCheckboxValidation
    } from "./tools/formvalidation"

import {
    sendauth_request,
    register_request,
    set_weui
    } from '../actions';

export class RegisterPage extends Component {

    pageReplace=(name)=>{
        this.props.history.replace(name);
    }

	render() {
        const usertype = localStorage.getItem('usertype');
        const invitecode = localStorage.getItem("invitecode");
        const {
            handleSubmit,
            onClickRegister,
            sendCode,
            hasAggree,
            username,
            pristine,
            submitting
            } = this.props;
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

                <div className="litit">邀请码:</div>
                {(usertype==="userborrow")?(
                    <div className="li">
                        <Field
                            name="invitecode"
                            id="invitecode"
                            placeholder="请输入邀请码"
                            type="text"
                            component={ InputValidation }
                            validate={[ required,length6 ]}
                        />
                    </div>
                ):''}

                <div className="aggreeForm">
                    <Field
                        name="hasAggree"
                        id="hasAggree"
                        component={ WeuiCheckboxValidation }
                        type="checkbox"
                        labelinfo="我已经阅读并同意[红领金]"
                        validate={[ ischecked ]}
                        lnkurl="/"
                        lnktxt="运营条款"
                        />
                </div>

				<div className="submitBtn">
                    <button
                        className="btn login"
                        disabled={(pristine || submitting)&&hasAggree}
                        >
                        <span>注册</span>
                    </button>
                    <span
                        className="btn register"
                        onClick={()=>{this.pageReplace("/login")}}
                        >
                        <span>登录</span>
                    </span>
				</div>
			</Form>
    	)
    }
}

RegisterPage = reduxForm({
    form: 'selectingFormValues',
    initialValues:{
        invitecode: localStorage.getItem("invitecode") || "",
    }
})(RegisterPage);

const selector = formValueSelector('selectingFormValues');
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
        let payload = {phonenumber:value,reason:'register'};
        this.props.dispatch(sendauth_request(payload));
    }
    //点击注册
    onClickRegister =(value)=>{
        let usertype = this.props.usertype;
        let payload = {
            username: value.username,
            authcode: value.authcode,
            password: value.password,
            weixinopenid: localStorage.getItem("openid"),//微信openid
            invitecode : localStorage.getItem("invitecode"),//获取邀请码
        };
        if(usertype === 'userborrow'){
            payload.invitecode = value.invitecode;
        }
        this.props.dispatch(set_weui({
            loading : {
                show : true
            },
        }));
        this.props.dispatch(register_request(payload));
    }

    componentWillUnmount(){
        this.props.dispatch(set_weui({
            loading : {
                show : false
            },
        }));
    }

    render() {
        return (
            <div className="registerPage AppPage">
                <DocumentTitle title="注册" />
                <RegisterPage
                    onClickRegister={this.onClickRegister}
                    sendCode={this.sendCode}
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
