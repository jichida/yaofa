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
import { withRouter } from 'react-router-dom';
import {
    userauthentication_request,
    set_weui
    } from '../../actions';

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
        const {
            handleSubmit,
            validationSubmit,
            submitting
        } = this.props;
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
                <button 
                    disabled={submitting}
                    className="btn Primary">
                    <span>确认</span>
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
        //console.log(value);
        this.props.dispatch(userauthentication_request({
            type:'id',
            data:value
        }));
        this.props.dispatch(set_weui({
            toast: {
                show : true,
                text : "递交成功",
                type : "success"
            },
        }))
        this.props.history.goBack();
    }

    // componentWillReceiveProps(nextProps) {
    //     // if (nextProps.userlogin.resultid===2 && this.props.userlogin.resultid===0) {
            // this.props.dispatch(set_weui({
            //     toast: {
            //         show : true,
            //         text : "身份认证已完成",
            //         type : "success"
            //     },
            // }))
    //     //     this.props.history.goBack();
    //     // }
    //     if (this.props.userlogin.resultid!=-1 && nextProps.userlogin.resultid===-1) {
    //         this.props.dispatch(set_weui({
    //             toast: {
    //                 show : true,
    //                 text : "认证失败,重新认证",
    //                 type : "warning"
    //             },
    //         }))
    //     }

    // }

	render() {
        return (
    		<div className="validationShenfenPage AppPage">
        		<DocumentTitle title="身份信息" />
                <ShenfenvalidationForm validationSubmit={this.testSubmit} />
        	</div>
    	)
    }
}

const data = ({userlogin}) => {
    return {userlogin};
};
Page = connect(data)(Page);
export default Page;
