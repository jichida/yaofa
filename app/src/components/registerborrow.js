import React, { Component } from 'react';
import DocumentTitle from "react-document-title";
import '../../public/css/register.css';


export class Page extends Component {

    componentWillMount() {

        //window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8ec8ba53700c0c89&redirect_uri=http%3A%2F%2Fwx.mrtejia.cn%2fapp%2fgetopenid&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";       
        //console.log("register borrowuser getopenid");
        //let code
        //this.props.match.params.type;
        //qrcode_for_gh_5e9622eff33e_430.jpg
        localStorage.setItem("usertype","userborrow");
        localStorage.setItem("invitecode",this.props.match.params.code);
    }
    
    render() {
        return (
            <div className="registerPage AppPage invitecoderegister">
                <DocumentTitle title="邀请注册" />
                <div className="list">
                    <img src="img/qrcode_for_gh_5e9622eff33e_430.png" />
                </div>
            </div>
        )
    }
}
export default Page;
