/*
    放款人完善信息
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import '../../../public/css/validation-photo.css';
import '../../../public/css/loaninfoform.css';
import { connect } from 'react-redux';
import config from '../../env/config.js';
import { fillrealnameprofile_request,set_weui } from "../../actions";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import _ from 'lodash';
import { renderImageupload } from '../tools/renderimageupload';
import { Field,Fields,reduxForm,Form} from 'redux-form';
import { withRouter } from 'react-router-dom';
const {
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form:FormUI,
    FormCell,
    Label,
    Input,
    Select,
    CellsTitle
    } = WeUI;
import { 
    required, 
    phone,
    InputValidation, 
    WeuiInputValidation,
    WeuiSelectValidation
    } from "../tools/formvalidation"

class PageForm extends Component {

    

    showLoading =(status)=>{
        this.props.dispatch(set_weui({
            loading : {
                show : status
            },
        }));
    }
     
    render(){
        const { handleSubmit,submitfn } = this.props;


        return(
            <Form 
                className="list loaninfoForm"
                onSubmit={handleSubmit(submitfn)}
                >
                <div className="li">
                    <Field
                        name="truename"
                        id="truename"
                        placeholder="请输入您真实姓名"
                        type="text"
                        component={ WeuiInputValidation }
                        validate={[ required ]}
                        InputTit="真实姓名"
                    />
                </div>
                <div className="li">
                    <Field
                        name="phonenumber"
                        id="phonenumber"
                        placeholder="请输入您的手机号"
                        type="number"
                        component={ WeuiInputValidation }
                        validate={[ required,phone ]}
                        InputTit="手机号码"
                    />
                </div>
                <div className="li">
                    <Field 
                        name="urlphoneid1" 
                        component={renderImageupload} 
                        loading = {this.showLoading.bind(this)}
                    />
                    <div>
                        <span className="tit">请上传身份证正面</span>
                        <span className="lnk blue">查看样例</span>
                    </div>
                </div>
                <div className="li">
                    <Field 
                        name="urlphoneid2" 
                        component={renderImageupload}
                        loading = {this.showLoading.bind(this)}
                    />
                    <div>
                        <span className="tit">请上传身份证反面</span>
                        <span className="lnk blue">查看样例</span>
                    </div>
                </div>
                <button className="btn Primary">
                    确认
                </button>
            </Form>  
        )
     }
}

class Page extends Component {
    componentWillMount () {
        const usertype = localStorage.getItem('usertype');
        if(usertype!="userlender"){
            this.props.history.replace("/");
        }
    }
    submitfn=(value)=>{
        value.urlphoneid1 = value.urlphoneid1==="img/11.png"?null:value.urlphoneid1;
        value.urlphoneid2 = value.urlphoneid2==="img/12.png"?null:value.urlphoneid2;
        value.resultrealname = 1;
        let payload = {
            data:{...value}
        };
        this.props.dispatch(fillrealnameprofile_request(payload));
        this.props.history.goBack();
    }
    render() {
        const { urlphoneid1,urlphoneid2,truename,phonenumber } = this.props;
        PageForm = reduxForm({
            form: 'selectingFormValues',
            initialValues:{
                urlphoneid1: urlphoneid1 || "img/11.png",
                urlphoneid2: urlphoneid2 || "img/12.png",
                truename : !!truename?truename:"",
                phonenumber : !!phonenumber?phonenumber:"",
            }
        })(PageForm);

        return (
            <div className="validationPhotoPage loaninfoPage AppPage">
                <DocumentTitle title="身份信息" />
                <div className="validationPhotoTitle">
                    完善身份信息
                </div>
                <PageForm submitfn={this.submitfn} />
                
            </div>
        )
    }
}
const data = ({userlogin:{urlphoneid1,urlphoneid2,truename,phonenumber}}) => {
    return { urlphoneid1,urlphoneid2,truename,phonenumber };
};
Page = connect(data)(Page);
export default Page;



