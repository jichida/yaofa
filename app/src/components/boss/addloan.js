/*
    放款
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import { connect } from 'react-redux';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/addborrow.css';

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
import { Fields, Field, reduxForm, Form, formValueSelector } from 'redux-form';
import {
    acceptorder_request
} from '../../actions';
import { 
    required, 
    InputValidation, 
    WeuiInputValidation,
    WeuiSelectValidation
    } from "../tools/formvalidation"


class PageForm extends Component{
    render(){
        const { handleSubmit,addloanSubmit } = this.props;
        return(
            <Form
                onSubmit={handleSubmit(addloanSubmit)}
                >
                <FormUI className="formStyle1">
                    <Field
                        name="moneylender"
                        id="moneylender"
                        placeholder="请输入您的放款额度"
                        type="number"
                        component={ WeuiInputValidation }
                        validate={[ required ]}
                        HeadIcon="img/13.png"
                        InputTit="额度"
                        Company="元"
                    />
                    <Field
                        name="feeservice"
                        id="feeservice"
                        placeholder="请输入服务费"
                        type="number"
                        component={ WeuiInputValidation }
                        validate={[ required ]}
                        HeadIcon="img/14.png"
                        InputTit="服务费"
                        Company="元"
                    />
                    <Field
                        name="depositratio"
                        id="depositratio"
                        placeholder="请输入押金比"
                        type="number"
                        component={ WeuiInputValidation }
                        validate={[ required ]}
                        HeadIcon="img/15.png"
                        InputTit="押金比"
                        Company="％"
                    />
                </FormUI>
                <div className="submitBtn">
                    <button 
                        className="btn Primary"
                        ><span>确定</span></button>
                </div>
            </Form>
        )
    }
}
PageForm = reduxForm({
    form: 'PageForm'
})(PageForm);

class Page extends Component {

    addloanSubmit=(data)=>{
        //console.log(data);
        let payload = {
            query:{_id: this.props.addloanid},
            data : data
            // data:{
            //     moneylender:800,//放款额度
            //     feeservice:80,//服务费
            //     depositratio:10,//押金比
            // }
        };
        this.props.dispatch(acceptorder_request(payload));
    }

	render() {
        return (
    		<div className="addborrowPage AppPage">
    			<DocumentTitle title="放款" />
                <PageForm addloanSubmit={this.addloanSubmit} />
    		</div>
    	)
    }
}

const data = ({userlender:{addloanid}}) => {
    //console.log(addloanid);
    //usertype: userborrow  useragency  userlender
    return {addloanid};
};
Page = connect(data)(Page);
export default Page;


