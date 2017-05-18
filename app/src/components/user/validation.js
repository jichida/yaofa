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


const {
    Icon,
    } = WeUI;

class Page extends Component {

	render() {
        
        const { userlogin } = this.props;

        let list = [
            {name: "身份认证", status: userlogin.resultid||false, url:'/validationshenfen'},
            {name: "运营商认证", status: userlogin.resultphone||false, url:'/validationhtml/phone'},
            //{name: "芝麻认证", status: userlogin.resultzhima||false, url:'/validationhtml/taobao'},
            {name: "淘宝认证", status: userlogin.resulttaobao||false, url:'/validationhtml/taobao'},
            {name: "照片认证", status: userlogin.resultrealname||false, url:'/validationphoto'}
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
                                    <span className="statustxt">去认证</span>
                                )}

                            </div>
                        )
                    })}
                </div>
            </div>
    	)
    }
}

// resultid:{ type: Boolean, default: false },//身份认证
// resultphone:{ type: Boolean, default: false },//运营商认证
// resultzhima:{ type: Boolean, default: false },//芝麻分
// resulttaobao:{ type: Boolean, default: false },//淘宝
// resultrealname:{ type: Boolean, default: false },//实名认证

const data = ({userlogin}) => {
    return {userlogin};
};
Page = connect(data)(Page);
export default Page;



