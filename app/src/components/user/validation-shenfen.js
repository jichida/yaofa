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
              >
                <FormUI>
                <Field
                    name="truename"
                    id="truename"
                    placeholder="请输入身份证中的名称"
                    type="text"
                    component={ WeuiInputValidation }
                    validate={[ required ]}
                    HeadIcon="img/32.png"
                    InputTit="身份证姓名"
                />
                <Field
                    name="cardno"
                    id="cardno"
                    placeholder="请输入身份证号"
                    type="number"
                    component={ WeuiInputValidation }
                    validate={[ required ]}
                    HeadIcon="img/32.png"
                    InputTit="身份证号"
                />
                </FormUI>
                <div className="btn Primary">
                    确认 ｜ 下一步
                </div>
            </Form>
      	);
    }
}

ShenfenvalidationForm = reduxForm({
    form: 'ShenfenvalidationForm'
})(ShenfenvalidationForm);

class Page extends Component {

    validationSubmit =(values)=>{
        console.log(`---------->${JSON.stringify(values)}`);
    }

    testSubmit = ()=>{
      let payload = {
        truename:'王小庆',
        cardno:'320421197909101357'
      };

      this.props.dispatch(userauthentication_request({
        type:'id',
        data:payload
      }));
    }

	render() {
        return (
    		<div className="addborrowPage AppPage">
          <div className="btn Primary" onClick={this.testSubmit}>
              测试
          </div>
    			<DocumentTitle title="身份信息" />
                <ShenfenvalidationForm validationSubmit={this.validationSubmit}/>
    		</div>
    	)
    }
}
Page = connect()(Page);
export default Page;
