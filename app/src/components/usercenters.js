import React, { Component } from 'react';
import { set_weui,getweixinpic_request } from '../actions';
import { connect } from 'react-redux';

class Page extends Component {

    componentWillMount() {
        let usertype = localStorage.getItem('usertype');
        if(usertype==="userborrow"){
            this.props.history.replace("/usercenter");
        }
        else if(usertype==="useragency"){
            this.props.history.replace("/agencyusercenter");
        }
        else if(usertype==="userlender"){
            this.props.history.replace("/bossusercenter");
        }
    }
	render() {
        return (
    		<div></div>
    	)
    }

}
Page = connect()(Page);
export default Page;
