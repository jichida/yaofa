import React, { Component } from 'react';
import { set_weui,getweixinpic_request } from '../actions';
import { connect } from 'react-redux';

class Page extends Component {

    componentWillMount() {
        let openid = this.props.match.params.openid;
        localStorage.setItem("openid",openid);
        if(openid){
            //获取用户微信数据
            this.props.dispatch(getweixinpic_request({openid: openid}));
            this.props.history.push("/");
        }else{
            this.props.dispatch(set_weui({
                toast:{
                    show: true,
                    text: '数据加载失败',
                    type: 'warning'
                }})
            )
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
