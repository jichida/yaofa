/*
    借款信息筛选条件
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/index.css';
import Footer from './footer';
import { connect } from "react-redux";
import SwiperBanner from '../tools/swiperbanner';
import { Fields, Field, reduxForm, Form, formValueSelector } from 'redux-form';
import {
    
} from '../../actions';

import { 
    required, 
    InputValidation, 
    WeuiInputValidation,
    WeuiSelectValidation,
    WeuiSwitchValidation
    } from "../tools/formvalidation"

const { 
    Tab,
    NavBar,
    NavBarItem,
    TabBody,
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form:FormUI,
    FormCell,
    Select,
    Label,
    Input,
    Switch
    } = WeUI;

class FillerForm extends Component {
    render(){
        const {
            handleSubmit,
            setFiller,
            realtimeforphoneyear,
            reset,
            pristine,
            submitting
            } = this.props;
        return(
            <Form
                onSubmit={handleSubmit(setFiller)}
                >
                <FormUI className="formStyle1">
                    <Field
                        name="limithuabei"
                        id="limithuabei"
                        placeholder="请输入花呗额度"
                        type="number"
                        component={ WeuiInputValidation }
                        InputTit="花呗分值(大于)"
                        Company="分"
                    />
                    <Field
                        name="limitjiebei"
                        id="limitjiebei"
                        placeholder="请输入借呗额度"
                        type="number"
                        component={ WeuiInputValidation }
                        InputTit="借呗额度(大于)"
                        Company="元"
                    />
                    <Field
                        name="jiedaibaofuzai"
                        id="jiedaibaofuzai"
                        placeholder="请输入借贷宝负债"
                        type="number"
                        component={ WeuiInputValidation }
                        InputTit="借贷宝负债(小于)"
                        Company="元"
                    />
                    <Field
                        name="jiedaobaoyihuan"
                        id="jiedaobaoyihuan"
                        placeholder="请输入借贷宝已还金额"
                        type="number"
                        component={ WeuiInputValidation }
                        InputTit="借贷宝已还"
                        Company="元"
                    />
                    <Field
                        name="realtimeforphoneyear"
                        id="realtimeforphoneyear"
                        Option={[
                            {value: "",label: '请选择'},
                            {value: "1",label: '1'},
                            {value: "2",label: '2'},
                            {value: "3",label: '3'},
                            {value: "4",label: '4'},
                            {value: "5",label: '5'},
                            {value: "6",label: '6'},
                            {value: "7",label: '7'},
                            {value: "8",label: '8'},
                            {value: "9",label: '9'},
                            {value: "10",label: '10'},
                            {value: "11",label: '11'},
                            {value: "12",label: '12'},
                        ]}
                        component={ WeuiSelectValidation }
                        InputTit="手机号实名时间 大于"
                        Company="年"
                    />
                    <div 
                        className="btnContent"
                        style={{borderTop:"1px solid #EEE"}}
                        >
                        <button 
                            className="btn Primary"
                            disabled={pristine || submitting}
                            >
                            <span>确定</span>
                        </button>
                        <button 
                            type="reset"
                            className="btn Default"
                            onClick={reset}
                            disabled={pristine || submitting}
                            >
                            <span>清空</span>
                        </button>
                    </div>
                </FormUI>
            </Form>
        )
    }
}
// hukou:String,
// limithuabei:Number,//花呗额度
// limitjiebei:Number,//借呗额度
// jiedaibaofuzai:Number,//借贷宝负债
// jiedaobaoyihuan:Number,//借贷宝已还
// realtimeforphoneyear:Number,//手机号实名时间（年）

FillerForm = reduxForm({
    form: 'fillerForm'
})(FillerForm);

const selector = formValueSelector('fillerForm');

FillerForm = connect(state => {
    const realtimeforphoneyear = selector(state, 'realtimeforphoneyear');
    return {realtimeforphoneyear};
})(FillerForm);

class Page extends Component {

    pushUrl = (name)=>{
        this.props.history.push(name);
    }

    componentDidMount(){
    }

    setFiller=(data)=>{
        console.log(data);
    }

	render() {
        const {} = this.props;
        return (
            <div className="indexPage AppPage">
                <DocumentTitle title="筛选" />
        		<div 
                    id="borrowlistfiller"
                    className="fillerBox"
                    >
                    <FillerForm setFiller={this.setFiller} />
                </div>
            </div>
    	)
    }
}



const data = ({userlender:{}}) => {
    return {};
};
Page = connect(data)(Page);
export default Page;


