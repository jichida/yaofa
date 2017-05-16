/*
    身份认证
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import { Fields, Field, reduxForm, Form, formValueSelector } from 'redux-form';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/validation-shenfen.css';
import _ from 'lodash';
import {userauthentication_request} from '../../actions';

const {
    Icon,
    Form:FormUI,
    FormCell,
    CellHeader,
    Label,
    CellBody,
    Input
    } = WeUI;

import { connect } from 'react-redux';
import {
        required,
        InputValidation,
        WeuiInputValidation,
        WeuiSelectValidation
        } from "../tools/formvalidation"

class ShenfenvalidationForm extends Component {

	render() {
        const {handleSubmit,validationSubmit} = this.props;
        return (
            <Form
                onSubmit={handleSubmit(validationSubmit)}
                className="list"
                >
                <FormUI className="formStyle1">
                    <Field
                        name="truename"
                        id="truename"
                        placeholder="请输入身份证中的名称"
                        type="text"
                        component={ WeuiInputValidation }
                        validate={[ required ]}
                        InputTit="真实姓名"
                    />
                    <Field
                        name="cardno"
                        id="cardno"
                        placeholder="请输入身份证号"
                        type="number"
                        component={ WeuiInputValidation }
                        validate={[ required ]}
                        InputTit="身份证号"
                    />
                </FormUI>
                <button className="btn Primary">
                    确认 ｜ 下一步
                </button>
            </Form>
      	);
    }
}

ShenfenvalidationForm = reduxForm({
    form: 'ShenfenvalidationForm'
})(ShenfenvalidationForm);

class Page extends Component {

    testSubmit = (value)=>{
        console.log(value);
        this.props.dispatch(userauthentication_request({
            type:'id',
            data:value
        }));
    }

	render() {
        return (
    		<div className="validationShenfenPage AppPage">
        		<DocumentTitle title="身份信息" />
                <ShenfenvalidationForm validationSubmit={this.testSubmit}/>
        	</div>
    	)
    }
}
Page = connect()(Page);
export default Page;
