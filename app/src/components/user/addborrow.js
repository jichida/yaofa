/*
    发布借款信息
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/addborrow.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Fields, Field, reduxForm, Form, formValueSelector } from 'redux-form';
import {
    insertorder_request
} from '../../actions';
import { 
    required, 
    InputValidation, 
    WeuiInputValidation,
    WeuiSelectValidation
    } from "../tools/formvalidation"
const { 
    FormCell,
    Checkbox,
    Form:FormUI,
    Select,
    Panel,
    PanelBody,
    MediaBox,
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Input,
    Label
    } = WeUI;


class AddborrowForm extends Component {

    render() {
        const { handleSubmit,addborrowSubmit,moneyusefor } = this.props;
        return (
            <Form
                onSubmit={handleSubmit(addborrowSubmit)}
                >
                <FormUI className="formStyle1">
                    <Field
                        name="moneylimit"
                        id="moneylimit"
                        placeholder="请输入借款额度"
                        type="number"
                        component={ WeuiInputValidation }
                        validate={[ required ]}
                        HeadIcon="img/13.png"
                        InputTit="借款额度"
                        Company="元"
                    />
                    <Field
                        name="moneyperiod"
                        id="moneyperiod"
                        placeholder="请输入借款天数"
                        type="number"
                        component={ WeuiInputValidation }
                        validate={[ required ]}
                        HeadIcon="img/32.png"
                        InputTit="借款周期"
                        Company="天"
                    />
                    <Field
                        name="moneyusefor"
                        id="moneyusefor"
                        Option={[{value: "临时周转",label: '临时周转'},{value: "买房",label: '买房'},{value: "买车",label: '买车'}]}
                        component={ WeuiSelectValidation }
                        validate={[ required ]}
                        HeadIcon="img/15.png"
                        InputTit="借款用途"
                        
                    />

                </FormUI>
                <div className="submitBtn">
                    <button className="btn Primary">确定</button>
                </div>
            </Form>
        )
    }
}

AddborrowForm = reduxForm({
    form: 'selectingFormValues'
})(AddborrowForm);

const selector = formValueSelector('selectingFormValues');

AddborrowForm = connect(state => {
    // can select values individually
    const moneyusefor = selector(state, 'moneyusefor');
    return {
        moneyusefor
    };
})(AddborrowForm);

AddborrowForm = withRouter(AddborrowForm);

class Page extends Component {

    addborrowSubmit =(value)=>{
        console.log(value);
        this.props.dispatch(insertorder_request(value));
    }

	render() {
        return (
    		<div className="addborrowPage AppPage">
    			<DocumentTitle title="我要借款" />
                <AddborrowForm addborrowSubmit={this.addborrowSubmit}/>
    		</div>
    	)
    }
}

Page = connect()(Page);
export default Page;


