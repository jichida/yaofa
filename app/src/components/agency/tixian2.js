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
    Form,
    FormCell,
    CellHeader,
    Label,
    CellBody,
    Input
    } = WeUI;

export class Page extends Component {

    onClickReturn =()=>{
        this.props.history.goBack();
    }

    setTixianForm = (e, type)=>{
        let payload = {};
        let val = e.target.value;
        payload[type] = val;
        this.props.dispatch(profit_set_tixianform(payload));
    }

    onClickNext = (name)=> {
        let profitform = this.props.profitform;
        if(profitform.truename==''||profitform.bankaccount==''||profitform.bankname==''){
            this.props.dispatch(set_weui({
                toast:{
                    show:true,
                    text: '提交失败',
                    type: 'warning'
                }})
            )
        }else{
            this.props.dispatch(withdrawcashapplyaddone_request(profitform));
        }
    }

    render() {
        return (
            <div className="tixianPage AppPage">
                <DocumentTitle title="提现验证" />
                <div className="AddressAddPage" style={{marginBottom:"30px"}}>
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>持卡人</Label>
                            </CellHeader>
                            <CellBody>
                                <Input placeholder='请输入持卡人姓名' onChange={(e)=>{this.setTixianForm(e,"truename")}} />
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>所在银行</Label>
                            </CellHeader>
                            <CellBody>
                                <Input placeholder='请输入银行名称' onChange={(e)=>{this.setTixianForm(e,"bankname")}} />
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>请输入卡号</Label>
                            </CellHeader>
                            <CellBody>
                                <Input placeholder='请输入卡号' onChange={(e)=>{this.setTixianForm(e,"bankaccount")}} />
                            </CellBody>
                        </FormCell>
                    </Form>


                </div>
                <div className="buttoncon">
                    <button
                        className="btn Primary"
                        style={{width:"100%"}}
                        onClick={()=>{this.onClickNext()}}>下一步</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps =  ({userlogin,profit}) =>{ return {...userlogin, ...profit};};
export default connect(mapStateToProps)(Page);
