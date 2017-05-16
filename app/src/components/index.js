/**
 * 跳转首页
 * 借款 userborrower 中介 useragency 放款 userlender
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export class Page extends Component {

    componentWillMount() {

        let usertype = localStorage.getItem('usertype');
        let loginsuccess = this.props.loginsuccess;
        if(loginsuccess){
            if(usertype==="userborrow"){
                this.props.history.replace("/userindex");
            }
            else if(usertype==="useragency"){
                this.props.history.replace("/agencyindex");
            }
            else if(usertype==="userlender"){
                this.props.history.replace("/bossindex");
            }
        }
        else{
            this.props.history.replace("/login");
        }
        
    };

    render(){
        return (
            <div></div>
        )
    }
}
const data = ({userlogin:{usertype,loginsuccess}}) => {
    return {usertype,loginsuccess};
};
Page = connect(data)(Page);
Page = withRouter(Page);
export default Page;