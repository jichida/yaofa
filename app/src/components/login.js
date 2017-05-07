import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../public/css/login.css';
import { connect } from 'react-redux';
import { Fields, Field, reduxForm, Form } from 'redux-form';
import { required, InputValidation, phone, length4 } from "./tools/formvalidation"

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

export class LoginPage extends Component {

	render() {
        const { handleSubmit,onClickLogin } = this.props;
        return (
			<Form 
                className="loginForm formStyle1"
                onSubmit={handleSubmit(onClickLogin)}
                >

                <div className="li">
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

LoginPage = reduxForm({
    form: 'simple'
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
        //
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

const data = ({userlogin:{usertype}}) => {
    return {usertype};
};

Page = connect(data)(Page);
export default Page;

