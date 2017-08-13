/*
    借款详情
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import _ from "lodash";
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/borrowuserinfo.css';
import { connect } from 'react-redux';
import { Fields, Field, reduxForm, Form, formValueSelector } from 'redux-form';
import { Province } from "../province";
import {
    fillrealnameprofile_request,
    set_weui,
} from '../../actions';
import {
    required,
    phone,
    InputValidation,
    WeuiInputValidation,
    WeuiSelectValidation,
    WeuiSwitchValidation
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


class PageForm extends Component {
    render() {
        const {
            handleSubmit,
            subBorrowuserinfo,
        } = this.props;
        const fromprovince = _.map(Province,(p,index)=>{
            return {value: p.name,label: p.name}
        });

        return (
            <Form
                onSubmit={handleSubmit(subBorrowuserinfo)}
                >
                <div className="list formStyle1" style={{background:"none"}}>
                    <FormUI>
                        <Field
                            name="hukou"
                            id="hukou"
                            Option={fromprovince}
                            component={ WeuiSelectValidation }
                            InputTit="户籍"
                        />
                        <Field
                            name="limithuabei"
                            id="limithuabei"
                            placeholder="请输入花呗额度"
                            type="number"
                            component={ WeuiInputValidation }
                            validate={[ required ]}
                            InputTit="花呗额度"
                            Company="元"
                        />
                        <Field
                            name="limitjiebei"
                            id="limitjiebei"
                            placeholder="请输入借呗额度"
                            type="number"
                            component={ WeuiInputValidation }
                            validate={[ required ]}
                            InputTit="借呗额度"
                            Company="元"
                        />
                        <Field
                            name="jiedaibaofuzai"
                            id="jiedaibaofuzai"
                            placeholder="请输入借贷宝负债"
                            type="number"
                            component={ WeuiInputValidation }
                            validate={[ required ]}
                            InputTit="借贷宝负债"
                            Company="元"
                        />
                        <Field
                            name="jiedaobaoyihuan"
                            id="jiedaobaoyihuan"
                            placeholder="请输入借贷宝已还"
                            type="number"
                            component={ WeuiInputValidation }
                            validate={[ required ]}
                            InputTit="借贷宝已还"
                            Company="元"
                        />
                        <Field
                            name="realtimeforphoneyear"
                            id="realtimeforphoneyear"
                            Option={[
                                {value: 0,label: "0年"},
                                {value: 1,label: "1年"},
                                {value: 2,label: "2年"},
                                {value: 3,label: "3年"},
                                {value: 4,label: "4年"},
                                {value: 5,label: "5年"},
                                {value: 6,label: "6年"},
                            ]}
                            component={ WeuiSelectValidation }
                            InputTit="手机号实名时间"
                        />
                    </FormUI>
                    <FormUI>
                        <Field
                            name="hasgudingzichan"
                            id="hasgudingzichan"
                            component={ WeuiSwitchValidation }
                            InputTit="是否有固定资产"
                        />
                        <Field
                            name="hasdanwei"
                            id="hasdanwei"
                            component={ WeuiSwitchValidation }
                            InputTit="是否有工作单位"
                        />
                        <Field
                            name="hasgongjijin"
                            id="hasgongjijin"
                            component={ WeuiSwitchValidation }
                            InputTit="是否有公积金"
                        />
                        <Field
                            name="hasshebao"
                            id="hasshebao"
                            component={ WeuiSwitchValidation }
                            InputTit="是否有社保"
                        />
                        <Field
                            name="hassanhaotongyi"
                            id="hassanhaotongyi"
                            component={ WeuiSwitchValidation }
                            InputTit="三号是否统一"
                        />
                        <Field
                            name="hasjinrihuankuan"
                            id="hasjinrihuankuan"
                            component={ WeuiSwitchValidation }
                            InputTit="有无今日还款"
                        />
                        <Field
                            name="hasyuqijilu"
                            id="hasyuqijilu"
                            component={ WeuiSwitchValidation }
                            InputTit="有无逾期记录"
                        />
                        <Field
                            name="hasshenfenzhengyuanjian"
                            id="hasshenfenzhengyuanjian"
                            component={ WeuiSwitchValidation }
                            InputTit="身份证原件"
                        />
                    </FormUI>
                    <FormUI>
                        <div className="connectuserlist">
                            <span>常用联系人1:</span>
                            <Field
                                name="contact1_name"
                                id="contact1_name"
                                placeholder="姓名"
                                component={ InputValidation }
                            />
                            <Field
                                name="contact1_phonenumber"
                                id="contact1_phonenumber"
                                placeholder="手机号"
                                component={ InputValidation }
                            />
                        </div>
                        <div className="connectuserlist">
                            <span>常用联系人2:</span>
                            <Field
                                name="contact2_name"
                                id="contact2_name"
                                placeholder="姓名"
                                component={ InputValidation }
                            />
                            <Field
                                name="contact2_phonenumber"
                                id="contact2_phonenumber"
                                placeholder="手机号"
                                component={ InputValidation }
                            />
                        </div>
                    </FormUI>
                </div>
                <div className="submitBtn">
                    <button className="btn Primary"><span>确定</span></button>
                </div>
            </Form>
        )
    }
}


// const selector = formValueSelector('addborrowinfoform');


class Page extends Component {

    subBorrowuserinfo=(value)=>{
        console.log(value);

        if(!!value.contact1_name && !!value.contact1_phonenumber){
            value['contact1'] = {name:value.contact1_name, phonenumber:value.contact1_phonenumber};
        }
        if(!!value.contact2_name && !!value.contact2_phonenumber){
            value['contact2'] = {name:value.contact2_name, phonenumber:value.contact2_phonenumber};
        }

        const loading = {
            show : true,
        }
        this.props.dispatch(set_weui({loading}));
        this.props.dispatch(fillrealnameprofile_request({data:value}));
        this.props.history.goBack();
    }

	render() {

        PageForm = reduxForm({
            form: 'addborrowinfoform',
            initialValues:{
                hukou : this.props.hukou||"江苏",
                limithuabei: this.props.hasOwnProperty("limithuabei")?this.props.limithuabei:"",
                limitjiebei: this.props.hasOwnProperty("limitjiebei")?this.props.limitjiebei:"",
                jiedaibaofuzai: this.props.hasOwnProperty("jiedaibaofuzai")?this.props.jiedaibaofuzai:"",
                jiedaobaoyihuan: this.props.hasOwnProperty("jiedaobaoyihuan")?this.props.jiedaobaoyihuan:"",
                realtimeforphoneyear: this.props.hasOwnProperty("realtimeforphoneyear")?this.props.realtimeforphoneyear:"",

                hasgudingzichan : this.props.hasgudingzichan||false,
                hasdanwei : this.props.hasdanwei||false,
                hasgongjijin : this.props.hasgongjijin||false,
                hasshebao : this.props.hasshebao||false,
                hassanhaotongyi : this.props.hassanhaotongyi||false,
                hasjinrihuankuan : this.props.hasjinrihuankuan||false,
                hasyuqijilu : this.props.hasyuqijilu||false,
                hasshenfenzhengyuanjian : this.props.hasshenfenzhengyuanjian||false,

                contact1_name : _.get(this.props,'contact1.name',''),
                contact1_phonenumber : _.get(this.props,'contact1.phonenumber',''),
                contact2_name : _.get(this.props,'contact2.name',''),
                contact2_phonenumber : _.get(this.props,'contact2.phonenumber',''),
            }
        })(PageForm);

        return (
    		<div className="borrowuserinfoPage addborrowuserinfoPage AppPage">
    			<DocumentTitle title="完善借款资料" />
                <div className="pageTitle"><span>完善借款资料</span></div>
                <div className="form" style={{height:(window.innerHeight-50)+"px"}}>
                    <PageForm subBorrowuserinfo={this.subBorrowuserinfo} />
                </div>
    		</div>
    	)
    }
}

const data = ({userlogin:{
    hukou,
    limithuabei,
    limitjiebei,
    jiedaibaofuzai,
    jiedaobaoyihuan,
    realtimeforphoneyear,
    hasgudingzichan,
    hasdanwei,
    hasgongjijin,
    hasshebao,
    hassanhaotongyi,
    hasjinrihuankuan,
    hasyuqijilu,
    hasshenfenzhengyuanjian,
    contact1,
    contact2,
}}) => {
    return {
        hukou,
        limithuabei,
        limitjiebei,
        jiedaibaofuzai,
        jiedaobaoyihuan,
        realtimeforphoneyear,
        hasgudingzichan,
        hasdanwei,
        hasgongjijin,
        hasshebao,
        hassanhaotongyi,
        hasjinrihuankuan,
        hasyuqijilu,
        hasshenfenzhengyuanjian,
        contact1,
        contact2,
    };
};
Page = connect(data)(Page);
export default Page;
