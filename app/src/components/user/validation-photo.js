/*
    照片认证
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import '../../../public/css/validation-photo.css';
import { connect } from 'react-redux';
import config from '../../env/config.js';
import { 
    fillrealnameprofile_request,
    set_weui,
    userauthentication_request
    } from "../../actions";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import _ from 'lodash';
import { renderImageupload } from '../tools/renderimageupload';
import { Field,Fields,reduxForm,Form} from 'redux-form';
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

class PageForm extends Component {

    showLoading =(status)=>{
        this.props.dispatch(set_weui({
            loading : {
                show : status
            },
        }));
    }

    //初始化
    constructor(props) {  
        super(props);  
        this.state = {
            showyangli : "showyangli",
            yangliimg : ""
        }; 

    }

    showYangli=(i)=>{
        console.log(i);
        const a = ["img/53.png","img/54.png","img/55.png"];
        this.setState({
            showyangli : "showyangli show",
            yangliimg : a[i],
        });
    }

    hideYangli=()=>{
        this.setState({showyangli: "showyangli"});
    }
     
    render(){
        const { handleSubmit,submitfn } = this.props;


        return(
            <Form 
                className="list"
                onSubmit={handleSubmit(submitfn)}
                >
                <div className="li">
                    <Field 
                        name="urlphoneid1" 
                        component={renderImageupload} 
                        loading = {this.showLoading.bind(this)}
                    />
                    <div>
                        <span className="tit">请上传身份证正面{this.state.yangliimg}</span>
                        <span className="lnk blue" onClick={this.showYangli.bind(this,0)}>查看样例</span>
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
                        <span className="lnk blue" onClick={this.showYangli.bind(this,1)}>查看样例</span>
                    </div>
                </div>
                <div className="li">
                    <Field 
                        name="urlphoneid3" 
                        component={renderImageupload} 
                        loading = {this.showLoading.bind(this)}
                    />
                    <div>
                        <span className="tit">手持身份证照片</span>
                        <span className="lnk blue" onClick={this.showYangli.bind(this,2)}>查看样例</span>
                    </div>
                </div>
                <button className="btn Primary">
                    <span>确认</span>
                </button>
                <div className={this.state.showyangli}
                    onClick={this.hideYangli}
                    >
                    <img src={this.state.yangliimg} />
                </div>
            </Form>  
        )
     }
}

class Page extends Component {

    componentWillMount(){
        const { resultid,history,dispatch } = this.props;
        if(resultid===2){}else{
            dispatch(set_weui({
                toast: {
                    show : true,
                    text : "必须先完成身份认证",
                    type : "warning"
                },
            }));
            history.goBack();
        }
    }

    submitfn=(value)=>{
        value.urlphoneid1 = value.urlphoneid1==="img/11.png"?null:value.urlphoneid1;
        value.urlphoneid2 = value.urlphoneid2==="img/13.png"?null:value.urlphoneid2;
        value.urlphoneid3 = value.urlphoneid3==="img/45.png"?null:value.urlphoneid3;
        value.resultrealname = 1;
        let payload = {
            data:{...value}
        };
        this.props.dispatch(fillrealnameprofile_request(payload));
        let payload_photo = {
            type:"photo",
            data:{
                idcardurl1:value.urlphoneid1,
                idcardurl2:value.urlphoneid2
            }
        };
        this.props.dispatch(userauthentication_request(payload_photo));
        //userauthentication ：type:photo,data:{idcardurl1:‘正面',idcardurl2:'反面‘}
        this.props.history.goBack();
    }
    render() {
        const { urlphoneid1,urlphoneid2,urlphoneid3 } = this.props;
        PageForm = reduxForm({
            form: 'selectingFormValues',
            initialValues:{
                urlphoneid1: urlphoneid1 || "img/11.png",
                urlphoneid2: urlphoneid2 || "img/12.png",
                urlphoneid3: urlphoneid3 || "img/45.png",
            }
        })(PageForm);

        return (
            <div className="validationPhotoPage AppPage">
                <DocumentTitle title="身份信息" />
                <div className="validationPhotoTitle">
                    请拍摄实时照片
                </div>
                <PageForm submitfn={this.submitfn} />
                
            </div>
        )
    }
}
const data = ({userlogin:{urlphoneid1,urlphoneid2,urlphoneid3,resultid}}) => {
    return {urlphoneid1,urlphoneid2,urlphoneid3};
};
Page = connect(data)(Page);
export default Page;



