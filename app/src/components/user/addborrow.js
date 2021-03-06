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
import withRouter from 'react-router-dom/withRouter';
import { Field, reduxForm, Form, formValueSelector } from 'redux-form';
import {
    insertorder_request,
    set_weui
} from '../../actions';
import {
    required,
    WeuiInputValidation,
    WeuiSelectValidation
    } from "../tools/formvalidation"
const {
    Form:FormUI,
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
                        Option={[
                            {value: "临时周转",label: '临时周转'},
                            {value: "买房",label: '买房'},
                            {value: "买车",label: '买车'},
                            {value: "还贷",label: '还贷'},
                            {value: "还信用卡",label: '还信用卡'},
                            {value: "购物",label: '购物'}
                        ]}
                        component={ WeuiSelectValidation }
                        HeadIcon="img/15.png"
                        InputTit="借款用途"
                    />

                </FormUI>
                <div className="submitBtn">
                    <button className="btn Primary"><span>确定</span></button>
                </div>
            </Form>
        )
    }
}

AddborrowForm = reduxForm({
    form: 'addborrowform',
    initialValues:{
        moneyusefor : "临时周转",

    }
})(AddborrowForm);
const selector = formValueSelector('addborrowform');
AddborrowForm = withRouter(AddborrowForm);

class Page extends Component {
    componentWillMount(){
        //询问用户是否需要跟新借款资料
        this.props.dispatch(set_weui({confirm:{
            show : true,
            title : "借款需要您的最新资料",
            text : "是否有资料需要跟新",
            buttonsCloseText : "不需要",
            buttonsClickText : "去更新",
            buttonsClick : ()=>{this.props.history.push("/addborrowuserinfo")}
        }}))
    }
    addborrowSubmit =(value)=>{
        let userlogin = this.props.userlogin;
        if(userlogin.approvalstatus=="已审核"){
            this.props.dispatch(insertorder_request(value));
        }else{
            if(
                userlogin.resultid===2 &&
                userlogin.resultphone===2 &&
                // userlogin.resulttaobao===2 &&
                userlogin.hasOwnProperty("hukou") &&
                // userlogin.resultphoto===2 &&
                userlogin.resultzhima===2
            ){
                this.props.dispatch(insertorder_request(value));
            }else{
                this.props.dispatch(
                    set_weui({confirm:{
                        show : true,
                        title : "认证审核未完善",
                        text : "只有通过认证才能进行借贷",
                        buttonsCloseText : "暂不",
                        buttonsClickText : "去认证",
                        buttonsClick : ()=>{this.props.history.push("/validation")}
                    }})
                )
            }
        }
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
const data = ({userlogin}) => {
    return {userlogin};
};
Page = connect(data)(Page);
export default Page;
