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
    passwordA,
    passwordB,
    } from "./tools/formvalidation"

import {
    sendauth_request,
    findpwd_request
    } from '../actions';

export class ResetPasswordPage extends Component {

    pageReplace=(name)=>{
        this.props.history.replace(name);
    }

    render() {
        const {
            handleSubmit,
            onClickResetPassword,
            sendCode,
            username,
            pristine,
            submitting
            } = this.props;
        return (
            <Form
                className="registerForm"
                onSubmit={handleSubmit(onClickResetPassword)}
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

                <div className="submitBtn">
                    <button
                        className="btn login"
                        disabled={pristine || submitting}
                        >
                        <span>确定</span>
                    </button>
                </div>
            </Form>
        )
    }
}

ResetPasswordPage = reduxForm({
    form: 'selectingFormValues'
})(ResetPasswordPage);

const selector = formValueSelector('selectingFormValues')
ResetPasswordPage = connect(
    state => {
        const username = selector(state, 'username');
        return {
            username
        }
    }
)(ResetPasswordPage)

ResetPasswordPage = withRouter(ResetPasswordPage);

export class Page extends Component {
    //发送验证码
    sendCode =(value)=>{
        let payload = {phonenumber:value,reason:'findpwd'};
        this.props.dispatch(sendauth_request(payload));
    }
    //点击注册
    onClickResetPassword =(value)=>{
        let payload = {
            username: value.username,
            authcode: value.authcode,
            password: value.password,
        };
        this.props.dispatch(findpwd_request(payload));
    }
    render() {
        return (
            <div className="registerPage AppPage">
                <DocumentTitle title="重置密码" />
                <ResetPasswordPage
                    onClickResetPassword={this.onClickResetPassword}
                    sendCode={this.sendCode}
                />
            </div>
        )
    }
}


Page = connect()(Page);
export default Page;
