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
    set_lender_borrowlist_filler
} from '../../actions';
import { withRouter } from 'react-router-dom';

import { 
    required, 
    WeuiInput
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
    // clearfiler=()=>{
    //     this.props.dispatch(set_lender_borrowlist_filler({}));
    //     this.props.history.goBack();
    // }
    render(){
        const {
            handleSubmit,
            setFiller,
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
                        component={ WeuiInput }
                        InputTit="花呗分值(大于)"
                        Company="分"
                    />
                    <Field
                        name="limitjiebei"
                        id="limitjiebei"
                        placeholder="请输入借呗额度"
                        type="number"
                        component={ WeuiInput }
                        InputTit="借呗额度(大于)"
                        Company="元"
                    />
                    <Field
                        name="jiedaibaofuzai"
                        id="jiedaibaofuzai"
                        placeholder="请输入借贷宝负债"
                        type="number"
                        component={ WeuiInput }
                        InputTit="借贷宝负债(小于)"
                        Company="元"
                    />
                    <Field
                        name="realtimeforphoneyear"
                        id="realtimeforphoneyear"
                        placeholder="手机号实名时间"
                        type="number"
                        component={ WeuiInput }
                        InputTit="手机号实名时间(大于)"
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

FillerForm = withRouter(FillerForm);


class Page extends Component {

    pushUrl = (name)=>{
        this.props.history.push(name);
    }

    componentDidMount(){
    }



    setFiller=(data)=>{
        
        this.props.dispatch(set_lender_borrowlist_filler(data));
        this.props.history.goBack();
    }

	render() {
        const {borrowlistfiller} = this.props;
        console.log(borrowlistfiller);
        FillerForm = reduxForm({
            form: 'fillerForm'
        })(FillerForm);

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



const data = ({userlender:{borrowlistfiller}}) => {
    return {borrowlistfiller};
};
Page = connect(data)(Page);
export default Page;


