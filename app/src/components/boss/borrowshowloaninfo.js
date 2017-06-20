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
        if(usertype!="userborrow"){
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
        const {orderInfo} = this.props;
        
        return (
            <div className="validationPhotoPage showloaninfoPage AppPage">
                <DocumentTitle title="老板资料" />
                <div className="list">
                    <Cells>
                        <Cell>
                            <CellBody>
                                姓名
                            </CellBody>
                            <CellFooter>
                                {orderInfo.userlender.truename}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                电话
                            </CellBody>
                            <CellFooter>
                                <a href={`tel:${orderInfo.userlender.phonenumber}`}>{orderInfo.userlender.phonenumber}</a>
                            </CellFooter>
                        </Cell>
                    </Cells>
                </div>
            </div>
        )
    }
}
const data = ({order:{orderInfo,myorderlist}, app:{percentborrowreal,percentborrowpre}}) => {
    let neworderInfo = orderInfo;
    let myneworderInfo = myorderlist[orderInfo._id];
    if(myneworderInfo){
        neworderInfo = myneworderInfo;
    }
    return {orderInfo:neworderInfo};
};
Page = connect(data)(Page);
export default Page;



