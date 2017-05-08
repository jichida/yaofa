import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Fields, Field, reduxForm, Form } from 'redux-form';
import '../../public/css/register.css';
import { 
    required, 
    InputValidation, 
    phone, 
    length4, 
    passwordA,
    passwordB,
    } from "./tools/formvalidation"
const {
    Agreement
    } = WeUI;

export class RegisterPage extends Component {

    constructor(props, context) {
        super(props, context);
        //筛选列表
        this.aggree = false;
    }

    pageReplace=(name)=>{
        this.props.history.replace(name);
    }
    //同意条款
    aggreeRule=(e)=>{
        let v = e.target.checked;
        this.aggree = v;
    }

	render() {
        const { handleSubmit,onClickRegister } = this.props;
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
                        name="code"
                        id="code"
                        placeholder="请输入验证码"
                        type="text"
                        maxlength="4"
                        component={ InputValidation }
                        validate={[ required,length4 ]}
                    />
                    <span className="btn Primary getYanzhen">获取验证码</span>
                </div>

                <div className="li">
                    <Field
                        name="password"
                        id="password"
                        placeholder="请输入账号密码"
                        type="password"
                        component={ InputValidation }
                        validate={[ required,passwordA ]}
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

                <Agreement
                    onClick={(e)=>{this.aggreeRule(e)}}
                    >
                    &nbsp;&nbsp;同意<a href="#">运营条款</a>
                </Agreement>
                

				<div className="submitBtn">
					<button 
                        className="btn login"
                        >
                        注册
                    </button>
                    <span 
                        className="btn register"
                        onClick={()=>{this.pageReplace("/login")}}
                        >
                        登录
                    </span>
				</div>
			</Form>
    	)
    }
}

RegisterPage = reduxForm({
    form: 'simple'
})(RegisterPage);

RegisterPage = withRouter(RegisterPage);

export class Page extends Component {
    componentWillMount() {
        if(this.props.usertype===''){
            this.props.history.replace("/usertype");
        };
    };
    //点击注册
    onClickRegister =(values)=>{
        console.log(values);
        //
    }
    render() {
        return (
            <div className="registerPage AppPage">
                <DocumentTitle title="注册" />
                <RegisterPage onClickRegister={this.onClickRegister} />
            </div>
        )
    }
}

const data = ({userlogin:{usertype}}) => {
    return {usertype};
};

Page = connect(data)(Page);
export default Page;
