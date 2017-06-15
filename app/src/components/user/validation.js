/*
    个人中心
*/
import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/css/validation.css';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
    set_weui
    } from '../../actions';
    
const {
    CellsTitle,
    Cell,
    Cells,
    CellBody,
    CellFooter,
    Icon
    } = WeUI;

class Page extends Component {

    //点击去认证
    clickitem =(url, v)=>{
        if(v==2){
            this.props.dispatch(set_weui({
                toast: {
                    show : true,
                    text : "该认证已完成",
                    type : "success"
                },
            }))
        }else if(v==1){
            this.props.dispatch(set_weui({
                toast: {
                    show : true,
                    text : "审核中,请等待",
                    type : "warning"
                },
            }))
        }else{
            this.props.history.push(url);
        }
    }

	render() {
        
        const { userlogin,history } = this.props;

        let list = [
            {name: "身份认证", status: userlogin.resultid||false, url:'/validationshenfen'},
            {name: "运营商认证", status: userlogin.resultphone||false, url:'/validationhtml/phone'},
            //{name: "芝麻认证", status: userlogin.resultzhima||false, url:'/validationhtml/taobao'},
            {name: "淘宝认证", status: userlogin.resulttaobao||false, url:'/validationhtml/taobao'},
            {name: "照片认证", status: userlogin.resultphoto||false, url:'/validationphoto'}
        ]

        return (
    		<div className="validationPage AppPage">
    			<DocumentTitle title="认证中心" />
                <div className="list">
                    <CellsTitle>基础认证</CellsTitle>
                    <div className="p1">
                    {_.map(list,(data, index)=>{
                        let style = data.status==2?"true":"false";
                        return (
                            <div
                                key={index}
                                className={style}
                                onClick={()=>{this.clickitem(data.url, data.status)}}
                                >
                                <span className="circular"></span>
                                <span className="name">{data.name}</span>
                                {data.status==2?(
                                    <Icon value="success-no-circle" />
                                ):""}
                                {data.status==0?(
                                    <span className="statustxt">去认证</span>
                                ):""}
                                {data.status==1?(
                                    <span className="statustxt color_warning">审核中...</span>
                                ):""}
                                {data.status==-1?(
                                    <span className="statustxt">认证失败,重新认证</span>
                                ):""}
                            </div>
                        )
                    })}
                    </div>
                    <div className="p2">
                        <CellsTitle>借款资料</CellsTitle>
                        <Cells>
                            <Cell access
                                onClick={()=>{history.push("/addborrowuserinfo")}}
                                >
                                <CellBody>
                                    完善借款资料,商家放款更快速
                                </CellBody>
                                <CellFooter>
                                    {userlogin.hasOwnProperty("hukou")?(<Icon value="success-no-circle" />):""}
                                </CellFooter>
                            </Cell>
                        </Cells>
                    </div>
                </div>
            </div>
    	)
    }
}

// resultid:{ type:  Schema.Types.Number, default: 0 },//身份认证,-1:失败，0,未递交，1：递交中，2：成功
// resultphone:{ type:  Schema.Types.Number, default: 0 },//运营商认证，-1:失败，0,未递交，1：递交中，2：成功
// resultzhima:{ type:  Schema.Types.Number, default: 0 },//芝麻分，-1:失败，0,未递交，1：递交中，2：成功
// resulttaobao:{ type:  Schema.Types.Number, default: 0 },//淘宝，-1:失败，0,未递交，1：递交中，2：成功
// resultrealname:{ type:  Schema.Types.Number, default: 0 },//实名认证，-1:失败，0,未递交，1：递交中，2：成功

const data = ({userlogin}) => {
    return {userlogin};
};
Page = connect(data)(Page);
export default Page;



