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

const {
    Icon,
    } = WeUI;

class Page extends Component {

	render() {

        let list = [
            {name: "身份认证", status: true,url:'/validationshenfen'},
            {name: "运营商认证", status: true,url:'/validationhtml/phone'},
            {name: "芝麻认证", status: true,url:'/validationhtml/taobao'},
            {name: "淘宝认证", status: false,url:'/validationhtml/taobao'},
            {name: "照片认证", status: false,url:'/validationhtml/taobao'}
        ]

        return (
    		<div className="validationPage AppPage">
    			<DocumentTitle title="认证中心" />
                <div className="list">
                    {_.map(list,(data, index)=>{
                        let style = data.status?"true":"false";
                        return (
                            <div
                                key={index}
                                className={style}
                                onClick={()=>{
                                  this.props.history.push(data.url);
                                }}
                                >
                                <span className="circular"></span>
                                <span className="name">{data.name}</span>
                                {data.status?(
                                    <Icon value="success-no-circle" />
                                ):(
                                    <span className="statustxt">待认证</span>
                                )}

                            </div>
                        )
                    })}
                </div>
                <div className="btn Primary">
                    去认证
                </div>
            </div>
    	)
    }
}

export default Page;
