/*
    身份认证
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import { Fields, Field, reduxForm, Form, formValueSelector } from 'redux-form';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/validation-shenfen.css';
import _ from 'lodash';
import {
    userauthentication_request,
    set_weui,
    userauthenticationhtml_request
    } from '../../actions';

const {
    CellsTitle,
    Cells,
    Cell,
    CellBody,
    CellFooter
    } = WeUI;

import { connect } from 'react-redux';


class Page extends Component {


    zhimasub =(name, cardno)=>{
        let loading = {
            show : true,
        }
        this.props.dispatch(set_weui({ loading }));
        this.props.dispatch(userauthenticationhtml_request({
            type: "zhima",
            data:{
                name: name,
                cert_no: cardno
            }
        }));
    }

    render() {
        const {userlogin, resultid_json} = this.props;
        return (
            <div className="validationShenfenPage AppPage">
                <DocumentTitle title="芝麻认证" />
                <div className="list">
                    <CellsTitle>身份信息</CellsTitle>
                    <Cells>
                        <Cell>
                            <CellBody>
                                姓名
                            </CellBody>
                            <CellFooter>
                                {resultid_json.data.name}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                身份证
                            </CellBody>
                            <CellFooter>
                                {resultid_json.data.cardno}
                            </CellFooter>
                        </Cell>
                    </Cells>
                    <button
                        className="btn Primary"
                        onClick={()=>{this.zhimasub(resultid_json.data.name, resultid_json.data.cardno)}}
                        >
                        <span>开始认证</span>
                    </button>
                </div>
            </div>
        )
    }
}

const data = ({userlogin}) => {
    let resultid_json =  JSON.parse(userlogin.resultid_obj); 
    return {userlogin, resultid_json};
};
Page = connect(data)(Page);
export default Page;
