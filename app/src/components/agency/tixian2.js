import React, { Component, PropTypes } from 'react';
import '../../../public/css/tixian.css';
import { connect } from 'react-redux';
import DocumentTitle from "react-document-title";
import {
    profit_set_tixianform,
    set_weui,
    sendauth_request,
    profit_set_profitid,
    withdrawcashapplyaddone_request
} from '../../actions';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';

const { 
    Form:FormUI,
    FormCell,
    CellHeader,
    Label,
    CellBody,
    Input
    } = WeUI;
import { 
    required, 
    InputBankValidation,
    validatebank,
    WeuiInputValidation
    } from "../tools/formvalidation"
import {
    Fields,
    Field,
    reduxForm,
    Form,
    formValueSelector,
    } from 'redux-form';
import BIN from "bankcardinfo";

class PageForm extends Component{
    render(){
        const { handleSubmit,tixianSubmit } = this.props;
        return(
            <Form
                onSubmit={handleSubmit(tixianSubmit)}
                >
                <FormUI className="formStyle1">
                    <Field 
                        name="truename" 
                        InputTit="姓名" 
                        placeholder="请输入持卡人姓名" 
                        type="text" 
                        component={WeuiInputValidation}
                        validate={[ required ]}
                        />
                    <Field 
                        name="bankaccount" 
                        InputTit="银行卡号" 
                        placeholder="请输入银行卡号" 
                        type="number" 
                        component={InputBankValidation}
                        validate={[ required,validatebank ]}
                        />
                </FormUI>
                <div className="submitBtn" style={{margin:"20px"}}>
                    <button className="btn Primary"><span>确定</span></button>
                </div>
            </Form>
        )
    }
}
PageForm = reduxForm({
    form: 'PageForm',
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
})(PageForm);



export class Page extends Component {

    onClickReturn =()=>{
        this.props.history.goBack();
    }

    setTixianForm = (val)=>{
        let payload = {bankaccount : val};
        this.props.dispatch(profit_set_tixianform({payload}));
    }

    //truename,bankaccount,bankname
    onClickNext = (value)=> {
        console.log(value);
        //let profitform = this.props.profitform;
        //this.props.dispatch(withdrawcashapplyaddone_request(profitform));
    }

    render() {
        return (
            <div className="tixianPage AppPage">
                <DocumentTitle title="提现验证" />
                <div className="AddressAddPage">
                    <PageForm tixianSubmit={this.onClickNext} /> 
                </div>
            </div>
        );
    }
}

const Data =  ({userlogin,profit}) =>{ return {...userlogin, ...profit};};
export default connect(Data)(Page);
