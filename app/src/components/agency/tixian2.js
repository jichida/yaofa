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
    Input,
    Tab,
    NavBar,
    NavBarItem,
    TabBody,
    Cells,
    } = WeUI;
import { 
    required, 
    InputBankValidation,
    validatebank,
    WeuiInputValidation
    } from "../tools/formvalidation";
import { _getBankInfoByCardNo } from "../tools/validationbank"
import {Field, reduxForm, Form, formValueSelector } from 'redux-form';

import BIN from "bankcardinfo";
// import Field from 'redux-form/lib/Field';
// import reduxForm from 'redux-form/lib/reduxForm';
// import Form from 'redux-form/lib/Form';
// import formValueSelector from 'redux-form/lib/formValueSelector';



class PageForm extends Component{

    componentWillReceiveProps(nextProps) {
        if (nextProps.type !== this.props.type) {
            this.props.reset();
        }
    }

    render(){
        const { handleSubmit,tixianSubmit,type,reset } = this.props;
        const placetxt = type?"支付宝账号":"银行卡卡号";
        return(
            <Form
                onSubmit={handleSubmit(tixianSubmit)}
                >
                <FormUI className="formStyle1">
                    <Field 
                        name="truename" 
                        InputTit="姓名" 
                        placeholder="提现人姓名" 
                        type="text" 
                        component={WeuiInputValidation}
                        validate={[ required ]}
                        />

                    {type?(
                        <Field 
                            name="bankaccount" 
                            InputTit={placetxt}
                            placeholder={`请输入${placetxt}`}
                            type="姓名" 
                            component={WeuiInputValidation}
                            validate={[ required ]}
                            />
                    ):(
                        <Field 
                            name="bankaccount" 
                            InputTit={placetxt}
                            placeholder={`请输入${placetxt}`}
                            type="number" 
                            component={InputBankValidation}
                            validate={[ required,validatebank ]}
                            />
                    )}

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

    componentWillUnmount(){
        this.props.dispatch(set_weui({
            loading:{
                show: false
            }})
        )
    }

    constructor(props) {  
        super(props);
        
        this.state = {type: true};  
    } 

    seltype =(type) =>{
        this.setState({type : type});
    }


    setTixianForm = (payload)=>{
        this.props.dispatch(profit_set_tixianform({payload}));
    }

    onClickNext = (value)=> {
        //console.log(value);
        // _getBankInfoByCardNo(value.bankaccount, (info)=>{
        //     if(err){
        //         this.props.dispatch(set_weui({
        //             toast:{
        //                 show: true,
        //                 text: '银行卡无法识别',
        //                 type: 'warning'
        //             }})
        //         )
        //     }else{
                
        //     }
        // })
        let profitform = this.props.profitform;

        if(this.state.type){//支付宝
            profitform.bankname = "支付宝";
            profitform.truename = value.truename;
            profitform.bankaccount = value.bankaccount;
            this.setTixianForm(profitform);
            this.props.dispatch(withdrawcashapplyaddone_request(profitform));
        }else{
            _getBankInfoByCardNo(value.bankaccount, (info)=>{
                
                if(!!info){
                    this.props.dispatch(set_weui({
                        loading:{
                            show: true
                        }})
                    )
                    profitform.bankname = info.bankName;
                    profitform.truename = value.truename;
                    profitform.bankaccount = value.bankaccount;
                    this.setTixianForm(profitform);
                    this.props.dispatch(withdrawcashapplyaddone_request(profitform));
                }else{
                    this.props.dispatch(set_weui({
                        toast:{
                            show: true,
                            text: '银行卡无法识别',
                            type: 'warning'
                        }})
                    )
                }

            })
        }
        // profitform.truename = value.truename;
        // profitform.bankaccount = value.bankaccount;
        // this.setTixianForm(profitform);
        //console.log(profitform);
        // this.props.dispatch(withdrawcashapplyaddone_request(profitform));
        // value.cashmoney = parseFloat(value.cashmoney);
        // if(this.props.balance<value.cashmoney){
        //     let toast = {
        //         show : true,
        //         text : "提现超出余额",
        //         type : "warning"
        //     }
        //     this.props.dispatch(set_weui({ toast }));
        // }else{
        //     this.props.dispatch(withdrawcashapplyaddone_request(value));
        // }
        
    }

    render() {
        return (
            <div className="tixianPage AppPage">
                <DocumentTitle title="提现验证" />
                <div className="AddressAddPage">

                    <Tab style={{height:(window.innerHeight)+"px"}}>
                        <NavBar>
                            <NavBarItem 
                                active={this.state.type}
                                onClick={()=>{this.seltype(true)}}
                            >
                                提现到支付宝
                            </NavBarItem>
                            <NavBarItem 
                                active={!this.state.type}
                                onClick={()=>{this.seltype(false)}}
                            >
                                提现到银行卡
                            </NavBarItem>
                        </NavBar>
                        <TabBody>
                            <Cells>
                                <PageForm tixianSubmit={this.onClickNext} type={this.state.type} /> 
                            </Cells>
                        </TabBody>
                    </Tab>
                </div>
            </div>
        );
    }
}

const Data =  ({userlogin,profit}) =>{ return {...userlogin, ...profit};};
export default connect(Data)(Page);
