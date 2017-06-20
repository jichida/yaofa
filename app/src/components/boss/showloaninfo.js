/*
    查看放款人信息
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
        // this.props.history.goBack();
    }
    pushUrl = (name)=>{
        this.props.history.push(name);
    }
    render() {
        const {urlphoneid1,urlphoneid2,truename,phonenumber} = this.props;
        
        return (
            <div className="validationPhotoPage showloaninfoPage AppPage">
                <DocumentTitle title="基本信息" />
                <div className="list">
                    <Cells>
                        <Cell>
                            <CellBody>
                                姓名
                            </CellBody>
                            <CellFooter>
                                {!!truename?truename:"暂无"}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                电话
                            </CellBody>
                            <CellFooter>
                                {!!phonenumber?phonenumber:"暂无"}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                身份证正面
                            </CellBody>
                            <CellFooter className="img">
                                {!!urlphoneid1?(<img src={urlphoneid1} />):"暂无"}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                身份证反面
                            </CellBody>
                            <CellFooter className="img">
                                {!!urlphoneid2?(<img src={urlphoneid2} />):"暂无"}
                            </CellFooter>
                        </Cell>
                    </Cells>
                    <span 
                        onClick={()=>{this.pushUrl("/loaninfo")}}
                        className="btn Primary"
                        >
                        去修改
                    </span>
                </div>
                

                
            </div>
        )
    }
}
const data = ({userlogin:{urlphoneid1,urlphoneid2,truename,phonenumber}}) => {
    return {urlphoneid1,urlphoneid2,truename,phonenumber};
};
Page = connect(data)(Page);
export default Page;



